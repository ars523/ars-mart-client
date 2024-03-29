import {
    Button,
    Stack,
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
                    <TableRow>
                        {
                            columns.map(column => (
                                <TableCell key={column.heading + 'title'}>
                                    <Typography variant='subtitle1'>
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
                                    <TableCell key={Math.random().toString()}>
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
        return <Typography variant='body1' sx={cellText}>
            {rowData[cellData.value] ? 'Yes' : 'No'}
        </Typography>
    }

    if (cellData.value === 'actions') {
        const buttons = actions.map((action, i) => (
            <Button
                key={action.value + rowData._id}
                onClick={() => action.onclick(rowData._id)}
                variant='contained'
                size='small'
                color={action.value === 'delete' ? 'error' : 'primary'}
            >
                {action.name}
            </Button>
        ))
        return <Stack direction='row'spacing={'1rem'}>{buttons}</Stack>
    }
    if (cellData.value === "createdAt") {
        return <Typography variant='body1' sx={cellText}>
            {rowData[cellData.value].slice(0, 10)}
        </Typography>
    }
    if (cellData.value === "name") {
        return <Typography variant='body1' sx={cellText}>
            {`${rowData[cellData.value].slice(0, 30)}${rowData[cellData.value].length>30?'...':''}`}
        </Typography>
    }
    return <Typography variant='body1' sx={cellText}>
        {rowData[cellData.value]}
    </Typography>
}

export default TablePrimary;