import React from 'react';
function SlickPrev(props) {
    const { onClick } = props;
    return (
    <button className='prev' onClick={onClick}><img src='./assets/img/left.svg' alt='logo'/></button>
    );
}

export default SlickPrev