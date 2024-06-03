import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import UseAuth from "../../hooks/UseAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTable } from 'react-table';

const MyAddedPets = () => {
    const axiosSecure = useAxiosSecures();
    const { user } = UseAuth();

    const { data: allPets = [], isLoading } = useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/allPets/email/${user?.email}`);
            return data;
        },
    });

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
                    {row.original.pet_status === 'adopted' ? 'Adopted' : (
                        <button
                            // onClick={() => handleMakeAdopt(row.original)}
                            className="btn border-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500"
                        >
                            Adopted It
                        </button>
                    )}
                </div>
            ),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <div className="text-center">
                    <Link>
                        <button className="btn btn-ghost btn-lg">
                            <FaEdit className="text-red-600" />
                        </button>
                    </Link>
                    <button
                        // onClick={() => handleDeleteUser(row.original)}
                        className="btn btn-ghost btn-lg"
                    >
                        <FaTrashAlt className="text-red-600" />
                    </button>
                </div>
            ),
        },
    ], []);

    const tableInstance = useTable({
        columns,
        data: allPets,
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

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
        </div>
    );
};

export default MyAddedPets;
