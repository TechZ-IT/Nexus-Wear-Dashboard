"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Redux

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
     Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
     Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
     PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import {
     AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
     AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"



// Icons
import { Pencil, Trash, Eye } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useDeleteSubCategoryMutation, useGetAllSubCategoriesQuery } from "@/redux/api/subCategoryApi/subCategoryApi"
import { Subcategory } from "@/types/categoryAndSubcategory"




export default function SubCategoryTable() {
     // State
     const [currentPage, setCurrentPage] = useState(1)
     const [itemsPerPage, setItemsPerPage] = useState(10)
     const [searchTerm, setSearchTerm] = useState("")
     const [statusFilter, setStatusFilter] = useState("all")
     const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)
     console.log(searchTerm, debouncedSearch);


     React.useEffect(() => {
          const timeout = setTimeout(() => {
               setDebouncedSearch(searchTerm)
          }, 500);
          return () => clearTimeout(timeout)
     }, [searchTerm])



     const router = useRouter()

     // API calls
     const { data, isLoading } = useGetAllSubCategoriesQuery({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
          status: statusFilter === "all" ? undefined : statusFilter,
     })

     const [deleteSubCategory, { isLoading: isDeleting }] = useDeleteSubCategoryMutation()



     // Data
     const subCategories: Subcategory[] = data?.data || []
     const total = data?.total || 0
     const totalPages = Math.ceil(total / itemsPerPage)
     console.log(subCategories);





     // Handlers
     const handleDelete = async (subCategoryId: string) => {
          if (subCategoryId) {
               try {
                    await deleteSubCategory(subCategoryId)
               } catch (error) {
                    console.error("Delete failed", error)
               }
          }
     }




     return (
          <div className="w-full pb-6">
               {/* Search + Filter + Add */}
               <div className="flex flex-wrap gap-3  items-center justify-between mb-4 w-auto">
                    <Input
                         placeholder="Search subCategories..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full md:max-w-sm"
                    />

                    <div className="flex gap-3 items-center">
                         {/* Rows per page */}
                         <Select value={String(itemsPerPage)} onValueChange={(val) => {
                              setItemsPerPage(Number(val))
                              setCurrentPage(1)
                         }}>
                              <SelectTrigger className="">
                                   <SelectValue placeholder="Rows" />
                              </SelectTrigger>
                              <SelectContent>
                                   <SelectItem value="5">5</SelectItem>
                                   <SelectItem value="10">10</SelectItem>
                                   <SelectItem value="20">20</SelectItem>
                              </SelectContent>
                         </Select>

                         <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="">
                                   <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                   <SelectItem value="all">All</SelectItem>
                                   <SelectItem value="active">Active</SelectItem>
                                   <SelectItem value="inactive">Inactive</SelectItem>
                                   <SelectItem value="pending">Pending</SelectItem>
                                   <SelectItem value="deleted">Deleted</SelectItem>
                              </SelectContent>
                         </Select>

                         <Button onClick={() => router.push("/subCategory/create")}>
                              Add Admin
                         </Button>
                    </div>
               </div>

               {/* Table */}
               <div className="overflow-hidden rounded-md border text-center">
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead className="font-extrabold text-center">#</TableHead>
                                   <TableHead className="font-extrabold ">Image</TableHead>
                                   <TableHead className="font-extrabold text-center">Sub Category Name</TableHead>
                                   <TableHead className="font-extrabold text-center">Description</TableHead>
                                   <TableHead className="font-extrabold text-center">Category Name</TableHead>
                                   <TableHead className="font-extrabold text-center">Created At</TableHead>
                                   <TableHead className="font-extrabold text-center">Actions</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody>
                              {isLoading ? (
                                   <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6">
                                             Loading...
                                        </TableCell>
                                   </TableRow>
                              ) : subCategories.length ? (
                                   subCategories.map((subCategory, idx) => (
                                        <TableRow key={subCategory.id}>
                                             <TableCell>
                                                  {(currentPage - 1) * itemsPerPage + idx + 1}
                                             </TableCell>

                                             <TableCell>
                                                  <Image
                                                       src={subCategory?.image ?? "/profileImg.jpg"}
                                                       alt="images"
                                                       width={50}
                                                       height={50}
                                                       quality={75}
                                                       className="h-12 w-12 object-contain"
                                                       draggable={false}
                                                  />
                                             </TableCell>

                                             <TableCell>{subCategory.name}</TableCell>
                                             <TableCell>{subCategory.description.slice(0,20)+"....."}</TableCell>
                                             <TableCell>{subCategory.category.name}</TableCell>
                                             <TableCell>{subCategory.createdAt.slice(0,10)}</TableCell>

                                             {/* Actions */}
                                             <TableCell>
                                                  {/* Edit */}
                                                  <Button
                                                       onClick={() => router.push(`/subCategories/update/${subCategory.id}`)}
                                                       variant="ghost"
                                                       className="h-8 w-8 p-0"
                                                  >
                                                       <Pencil />
                                                  </Button>

                                                  {/* Details */}
                                                  <Button
                                                       onClick={() => router.push(`/subCategories/details/${subCategory.id}`)}
                                                       variant="ghost"
                                                       className="h-8 w-8 p-0"
                                                  >
                                                       <Eye />
                                                  </Button>


                                                  <AlertDialog>
                                                       <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" disabled={isDeleting}>
                                                                 <Trash />
                                                            </Button>
                                                       </AlertDialogTrigger>

                                                       <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                 <AlertDialogTitle>
                                                                      Are you absolutely sure?
                                                                 </AlertDialogTitle>
                                                                 <AlertDialogDescription>
                                                                      This action cannot be undone. This will permanently
                                                                      delete your account and remove your data from our
                                                                      servers.
                                                                 </AlertDialogDescription>
                                                            </AlertDialogHeader>

                                                            <AlertDialogFooter>
                                                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                 <AlertDialogAction
                                                                      disabled={isDeleting}
                                                                      onClick={() => handleDelete(subCategory?.id)}
                                                                      className="bg-red-600 font-extrabold"
                                                                 >
                                                                      Continue
                                                                 </AlertDialogAction>
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
               <div className="flex items-center justify-center xl:justify-end mt-4">

                    {/* Page navigation */}
                    <div className="mt-4 flex justify-center">
                         <Pagination>
                              <PaginationContent>
                                   <PaginationItem>
                                        <PaginationPrevious
                                             href="#"
                                             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                             className={
                                                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                             }
                                        />
                                   </PaginationItem>

                                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                             <PaginationItem key={page}>
                                                  <PaginationLink
                                                       href="#"
                                                       isActive={currentPage === page}
                                                       onClick={() => setCurrentPage(page)}
                                                  >
                                                       {page}
                                                  </PaginationLink>
                                             </PaginationItem>
                                        )
                                   )}

                                   {totalPages > 5 && <PaginationEllipsis />}

                                   <PaginationItem>
                                        <PaginationNext
                                             href="#"
                                             onClick={() =>
                                                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                                             }
                                             className={
                                                  currentPage === totalPages
                                                       ? "pointer-events-none opacity-50"
                                                       : ""
                                             }
                                        />
                                   </PaginationItem>
                              </PaginationContent>
                         </Pagination>
                    </div>
               </div>
          </div>
     )
}