import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit : PropTypes.func,
};

PostFilterForm.defaultProps = {
    onSubmit : null
}
function PostFilterForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    const handleOnChange = (e) => {
        let target = e.target;
        let value = target.value
        setSearchTerm(target.value);
        if(typingTimeoutRef.current) { 
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {value};
            console.log(onSubmit);
            if(onSubmit){
                onSubmit(formValue);
            }
        },300)
    }
    return (
        <form className="form-group">
          <input type="text"
            className="form-control int" 
            aria-describedby="helpId" 
            placeholder=""
            value={searchTerm}
            onChange={handleOnChange}
            style = {{margin : '0 auto'}}
            />
        </form>
    );
}

export default PostFilterForm;