import React, {useRef} from 'react';
import './style.css'
import useWindowDimensions, {useViewPort} from '../utils/viewPort';
function getRowProps(rowProps, row) {
    return {
        onClick: (ev) => rowProps.onClickHandler(row)
    }
}
function Table({data, columns, rowProps}) {
    const { height, width } = useWindowDimensions();
    const tableContainer = useRef(null);
    const rowHeight = 24;
    let viewPortRows = Math.ceil(height/rowHeight)
    const {renderData,numberOfRows } = useViewPort({viewPortRows, data}, tableContainer);
    console.log("inside table", numberOfRows)
    return <div className="table-container" ref={tableContainer}><table className="table">
    <thead className="table-head">
        <tr>
            {columns.map((col, index) => <th key={`th-${index}`}><div>{col.label}</div></th>)}
        </tr>
    </thead>
    <tbody className="table-body">
        {renderData.map(d => {
            return <tr {...getRowProps(rowProps, d)}>{columns.map(({accesor, className}, index) => {
                const cellValue = accesor && typeof accesor === 'string' ? d[accesor] : accesor(d);
                const cellProps = {};
                if(className) {
                    cellProps.className = className;
                }
                return <td {...cellProps} title={cellValue} key={`${d.id}-tr-${index}-td`}><div>{cellValue}</div></td>
            })}</tr>
        })}
    </tbody>
</table></div>    
}
export default React.memo(Table);