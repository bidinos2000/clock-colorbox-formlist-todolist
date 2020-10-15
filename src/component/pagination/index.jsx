import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

Paging.propTypes = {
    pagination : PropTypes.object.isRequired,
    onPageChange : PropTypes.func,
};

Paging.defaultProps = {
    onPageChange : null
}

function Paging(props) {
    const { pagination, onPageChange } = props; 
    const {_totalRows} = pagination;
    const [current, setCurrent] = useState(1);

    const onChange = page => {
        setCurrent(page);
        onPageChange(page);
      };
    
    return (
        <div>
            <Pagination current={current} onChange={onChange} total={_totalRows}/>
        </div>
    );
}

export default Paging;