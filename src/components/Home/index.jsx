import React from 'react';
import Header from '../Header';
import Filter from '../Filter';
import ToolCards from '../ToolCards';
import Footer from '../Footer';
import Scrollbars  from 'react-custom-scrollbars';

function header(props) {
    return (
        <>
        {/* <Scrollbars > */}
            <Header/>
             <Filter/>
            <ToolCards/>
            {/* <Footer/> */}

         {/* </Scrollbars> */}
        </>
    );
}

export default header;