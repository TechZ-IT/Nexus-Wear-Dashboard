"use client"

import * as React from "react"
import { useState } from "react"
import { useDeleteAdminMutation, useGetAdminsQuery } from "@/redux/api/adminApi/adminApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { Pencil, Trash, Eye } from "lucide-react"
import {
     Pagination,
     PaginationContent,
     PaginationEllipsis,
     PaginationItem,
     PaginationLink,
     PaginationNext,
     PaginationPrevious,
} from "@/components/ui/pagination"

import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Admin } from "@/types/admin"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"

export default function AdminTable() {
     const [currentPage, setCurrentPage] = useState(1)
     const [itemsPerPage, setItemsPerPage] = useState(10)
     const [searchTerm, setSearchTerm] = useState('')
     const [statusFilter, setStatusFilter] = useState("all")

     const { data, isLoading, refetch } = useGetAdminsQuery({
          page: currentPage,
          limit: itemsPerPage,
     })

     const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation()

     const admins: Admin[] = data?.data || []
     const total = data?.total || 0
     const totalPages = Math.ceil(total / itemsPerPage)


     const filteredAdmins = admins.filter(admin => {
          const matchesSearch =
               admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               admin.phone.includes(searchTerm) ||
               admin.role.name.toLowerCase().includes(searchTerm.toLowerCase())

          const matchesStatus =
               statusFilter === "all" ? true : admin.status === statusFilter

          return matchesSearch && matchesStatus
     })
     console.log(filteredAdmins);


     const handleDelete = async (id: string) => {
          if (id) {
               try {
                    await deleteAdmin(id).unwrap()
                    await refetch()
               } catch (error) {
                    console.error("Delete failed", error)
               }
          }
     }

     return (
          <div className="w-full px-6 pb-6">

               {/* Search + Filter + Add */}
               <div className="flex justify-between items-center mb-4">
                    <Input
                         placeholder="Search admins..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="max-w-sm"
                    />
                    <div className="flex gap-3 items-center">
                         <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="border p-[6px] rounded"
                         >
                              <option value="all">All</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="pending">Pending</option>
                              <option value="deleted">Deleted</option>
                         </select>
                         <Button onClick={() => alert("Add Admin")}>Add Admin</Button>
                    </div>
               </div>

               {/* Table */}
               <div className="overflow-hidden rounded-md border">
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>#</TableHead>
                                   <TableHead>Name</TableHead>
                                   <TableHead>Email</TableHead>
                                   <TableHead>Phone</TableHead>
                                   <TableHead>Role</TableHead>
                                   <TableHead>Status</TableHead>
                                   <TableHead>Actions</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody>
                              {isLoading ? (
                                   <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6">
                                             Loading...
                                        </TableCell>
                                   </TableRow>
                              ) : filteredAdmins.length ? (
                                   filteredAdmins.map((admin, idx) => (
                                        <TableRow key={admin.id}>
                                             <TableCell>{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                                             <TableCell>{admin.name}</TableCell>
                                             <TableCell>{admin.email}</TableCell>
                                             <TableCell>{admin.phone}</TableCell>
                                             <TableCell>{admin.role.name}</TableCell>
                                             <TableCell>
                                                  <span
                                                       className={`px-2 py-1 text-xs font-semibold rounded-full ${admin.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                            }`}
                                                  >
                                                       {admin.status}
                                                  </span>
                                             </TableCell>
                                             {/* actions */}
                                             <TableCell>

                                                  {/* edit admin */}
                                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                                       <Pencil />
                                                  </Button>

                                                  {/* admin details */}
                                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                                       <Eye />
                                                  </Button>

                                                  {/* admin delete button */}
                                                  <AlertDialog>
                                                       <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" disabled={isDeleting}><Trash /></Button>
                                                       </AlertDialogTrigger>
                                                       <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                 <AlertDialogDescription>
                                                                      This action cannot be undone. This will permanently delete your
                                                                      account and remove your data from our servers.
                                                                 </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                 <AlertDialogAction disabled={isDeleting} onClick={() => handleDelete(admin?.id)} className=" bg-red-600 font-extrabold">Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                       </AlertDialogContent>
                                                  </AlertDialog>

                                             </TableCell>
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6">
                                             No results found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>

               {/* Pagination */}
               <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-700">
                         Showing page {currentPage} of {totalPages} (Total {total})
                    </div>

                    <div className="flex items-center space-x-4">
                         <span className="text-sm text-gray-700">Rows per page:</span>
                         <select
                              value={itemsPerPage}
                              onChange={(e) => {
                                   setItemsPerPage(Number(e.target.value))
                                   setCurrentPage(1)
                              }}
                              className="px-2 py-1 border rounded-md"
                         >
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                         </select>
                    </div>

                    <div className="mt-4 flex justify-center">
                         <Pagination>
                              <PaginationContent>
                                   <PaginationItem>
                                        <PaginationPrevious
                                             href="#"
                                             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                             className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                   </PaginationItem>

                                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                             <PaginationLink
                                                  href="#"
                                                  isActive={currentPage === page}
                                                  onClick={() => setCurrentPage(page)}
                                             >
                                                  {page}
                                             </PaginationLink>
                                        </PaginationItem>
                                   ))}

                                   {totalPages > 5 && <PaginationEllipsis />}

                                   <PaginationItem>
                                        <PaginationNext
                                             href="#"
                                             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                             className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                   </PaginationItem>
                              </PaginationContent>
                         </Pagination>
                    </div>
               </div>


          </div>
     )
}
