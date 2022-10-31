import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React from 'react';

const TablePrimary = ({ data, columns, actions }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ borderBottom: '2px solid #333' }}>
                        {
                            columns.map(column => (
                                <TableCell key={column.heading + 'title'}>
                                    <Typography variant='h6'>
                                        {column.heading}
                                    </Typography>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => (
                        <TableRow
                            key={row._id}
                        >
                            {
                                columns.map((cellData, index) => (
                                    <TableCell key={row._id + row[cellData.value]}>
                                        <CellData
                                            rowData={row}
                                            cellData={cellData}
                                            actions={actions}
                                        />
                                    </TableCell>
                                ))
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const CellData = ({ rowData, cellData, actions }) => {
    const cellText = {
        color: 'grey.900',
        fontWeight: '400'
    }
    if (typeof (rowData[cellData.value]) === "boolean") {
        return <Typography variant='h6' sx={cellText}>
            {rowData[cellData.value] ? 'Yes' : 'No'}
        </Typography>
    }

    if (cellData.value === 'actions') {
        const buttons = actions.map((action) => (
            <Button
                key={action.name}
                onClick={() => action.onclick(rowData._id)}
                variant='contained'
                size='small'
                color={action.name === 'Delete' ? 'error' : 'primary'}
                sx={{ mr: '0.5rem' }}
            >
                {action.name}
            </Button>
        ))
        return buttons
    }
    return <Typography variant='h6' sx={cellText}>
        {rowData[cellData.value]}
    </Typography>
}

export default TablePrimary;