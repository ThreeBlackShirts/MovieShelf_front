import React, {useRef} from 'react';

import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import ListContent from 'component/ListContent';
import 'style/listpage.css';
import 'style/header.css';
import 'style/footer.css'

const ListPage = () => {

    return (
        <div>
            <Header />
            <ListContent />
            <Footer />
        </div>
    );
};


export default ListPage;