import React from 'react';
import './style.css'
import useWindowDimensions from '../utils/viewPort';
function getRowProps(rowProps, row) {
    return {
        onClick: (ev) => rowProps.onClickHandler(row)
    }
}
function Table({data, columns, rowProps}) {
    const { height, width } = useWindowDimensions();
    return <div className="table-container"><table className="table">
    <thead className="table-head">
        <tr>
            {columns.map(col => <th><div>{col.label}</div></th>)}
        </tr>
    </thead>
    <tbody className="table-body">
        {data.map(d => {
            return <tr {...getRowProps(rowProps, d)}>{columns.map(({accesor, className}) => {
                const cellValue = accesor && typeof accesor === 'string' ? d[accesor] : accesor(d);
                const cellProps = {};
                if(className) {
                    cellProps.className = className;
                }
                return <td {...cellProps} title={cellValue}><div>{cellValue}</div></td>
            })}</tr>
        })}
    </tbody>
</table></div>
    
}
export default Table;