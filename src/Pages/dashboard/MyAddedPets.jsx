import { useMemo, useState } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import UseAuth from "../../hooks/UseAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTable } from 'react-table';
import toast from 'react-hot-toast';
import DeleteModal from '../../Modal/DeleteModal';
import StatusModal from '../../Modal/StatusModal'; 

const MyAddedPets = () => {
    const axiosSecure = useAxiosSecures();
    const { user } = UseAuth();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const closeStatusModal = () => {
        setIsStatusModalOpen(false);
    };

    const { data: allPets = [], isLoading, refetch } = useQuery({
        queryKey: ['allPets', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/allPets/email/${user?.email}`);
            return data;
        },
    });

    const pageSize = 10;
    const pageCount = Math.ceil(allPets.length / pageSize);
    const paginatedPets = allPets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const { mutateAsync: mutateDelete } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/allPets/${id}`);
            return data;
        },
        onSuccess: data => {
            // console.log(data);
            refetch();
            toast.success('Successfully deleted.');
        },
    });

    const handleDelete = async id => {
        try {
            await mutateDelete(id);
        } catch (err) {
            // console.log(err);
        }
    };

    const { mutateAsync: mutateStatus } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.patch(`/allPets/${id}`);
            return data;
        },
        onSuccess: data => {
            // console.log(data);
            refetch();
            toast.success('Successfully Updated.');
        },
    });

    const handleStatus = async id => {
        try {
            await mutateStatus(id);
        } catch (err) {
            // console.log(err);
        }
    };

    const columns = useMemo(() => [
        {
            Header: '#',
            accessor: 'index',
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: 'Pet Name',
            accessor: 'pet_name',
            Cell: ({ value }) => <div className="text-center">{value}</div>,
        },
        {
            Header: 'Pet Category',
            accessor: 'pet_category',
            Cell: ({ value }) => (
                <div className="text-center">
                    {value.value ? value.value : value}
                </div>
            ),
        },
        {
            Header: 'Pet Image',
            accessor: 'pet_image_url',
            Cell: ({ value }) => (
                <div className="flex justify-center">
                    <img className="rounded-full lg:h-24 lg:w-24 h-14 w-14" src={value} alt="" />
                </div>
            ),
        },
        {
            Header: 'Adoption Status',
            accessor: 'pet_status',
            Cell: ({ row }) => (
                <div className="text-center">
                    {row.original.pet_status === 'adopted' ? 
                     <button
                     className="btn border-2 border-pink-500 text-white bg-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500"
                 >
                     Adopted
                 </button>
                     : (
                        <button
                            onClick={() => {setUpdateId(row.original._id) ; setIsStatusModalOpen(true)}}
                            className="btn border-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500"
                        >
                            Not Adopted
                        </button>
                    )}
                </div>
            ),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <div className="flex justify-center">
                    <Link to={`/dashboard/updatePets/${row.original._id}`}>
                        <button className="btn btn-ghost btn-lg">
                            <FaEdit className="text-red-600" />
                        </button>
                    </Link>
                    <div>
                        <button
                            onClick={() => { setDeleteId(row.original._id); setIsDeleteModalOpen(true); }}
                            className="btn btn-ghost btn-lg"
                        >
                            <FaTrashAlt className="text-red-600" />
                        </button>
                    </div>
                </div>
            ),
        },
    ], []);

    const tableInstance = useTable({
        columns,
        data: paginatedPets,
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    const changePage = page => {
        setCurrentPage(page);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>LovingPets | My Added Pets</title>
            </Helmet>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl text-center text-pink-500 mb-5">My Added Pets: {allPets.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} key={column.id} className="text-center">{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id} className="text-center">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="pagination flex flex-wrap gap-3">
                        {[...Array(pageCount).keys()].map(page => (
                            <li key={page} className={`page-item ${currentPage === page + 1 ? 'active bg-pink-500 text-white border border-pink-500 px-3 py-1 rounded-md' : 'border border-pink-500 px-3 py-1 rounded-md'}`}>
                                <button className="page-link " onClick={() => changePage(page + 1)}>{page + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <StatusModal
                isOpen={isStatusModalOpen}
                closeModal={closeStatusModal}
                handleStatus={handleStatus}
                id={updateId}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                closeModal={closeDeleteModal}
                handleDelete={handleDelete}
                id={deleteId}
            />
        </div>
    );
};

export default MyAddedPets;
