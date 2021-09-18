import React from 'react';
function getRowProps(rowProps, row) {
    return {
        onClick: (ev) => rowProps.onClickHandler(row)
    }
}
function Table({data, columns, rowProps}) {

    return <table>
        <thead>
            <tr>
                {columns.map(col => <th>{col.label}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map(d => {
                return <tr {...getRowProps(rowProps, d)}>{columns.map(({accesor}) => {
                    const cellValue = accesor && typeof accesor === 'string' ? d[accesor] : accesor(d);

                    return <td>{cellValue}</td>
                })}</tr>
            })}
        </tbody>
    </table>
}
export default Table;