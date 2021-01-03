import React from 'react';
function SlickNext(props) {
    const { onClick } = props;
    return (
        <button className='next' onClick={onClick}><img src='./assets/img/right.svg' alt='logo'/></button>
    );
}

export default SlickNext