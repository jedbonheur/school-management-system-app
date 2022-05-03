import React from 'react';
import {PageWrapper} from "../../../common/DesignConstants"
import PageTitle from "../../UIs/PageTitle"
const Home = () => {
 return (
  <PageWrapper>
    <PageTitle 
    title='Student Dashboard'
    homePath='dashboard'
    page='home'
    />
  </PageWrapper>
 );
};

export default Home;