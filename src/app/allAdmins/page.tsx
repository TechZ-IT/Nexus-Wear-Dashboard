"use client"

import * as React from "react"
import { useState } from "react"
import { useGetAdminsQuery } from "@/redux/api/adminApi/adminApi"
import { AllAdmins } from "@/types/allAdmin"
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
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function AdminTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all") // NEW

    // API Call with pagination
    const { data, error, isLoading } = useGetAdminsQuery({
        page: currentPage,
        limit: itemsPerPage,
    })

    const admins: AllAdmins[] = data?.data || []
    const total = data?.total || 0
    const totalPages = Math.ceil(total / itemsPerPage)

    // Filter (client-side: search + status)
    const filteredAdmins = admins.filter((admin) => {
        const matchesSearch =
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.phone.includes(searchTerm) ||
            admin.role.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ? true : admin.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Users</h1>

            {/* Search + Add */}
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex gap-3 items-center">
                    <div>
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
                    </div>
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
                                    <TableCell>
                                        {(currentPage - 1) * itemsPerPage + idx + 1}
                                    </TableCell>
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
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
