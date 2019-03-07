import React from 'react';

export default props =>(

    <div className='shadow row'>
    <div class="col-lg-6">{props.name}</div>
    <img src={props.image} width='500' height='500'/>
    <a href={'https://maps.google.com/?q=' + props.latty + ',' + props.longy}
            className='btn btn-primary' target='value'> Directions </a>
    

    </div>
);