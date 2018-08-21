import React from 'react';

export default props =>(
    <div className='well'>
    <h4>{props.name}</h4>
    <img src={props.image} width='500' height='500'/>
    <a href={'https://maps.google.com/?q=' + props.latty + ',' + props.longy}
            className='btn btn-primary' target='value'> Directions </a>
    

    </div>
);