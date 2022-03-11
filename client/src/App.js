import logo from './logo.svg';
import './App.css';
import { Box } from '@material-ui/core';
import { Routes, Route, BrowserRouter } from "react-router-dom";
//components
import Header from "./components/Header"
import Home from './components/home/Home';
import DetailView from './components/posts/DetailView';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';
import AccountProvider from './context/AccountProvider';
import CategoryProvider from './context/CategoryProvider';
function App() {
  return (
    <AccountProvider>
    <CategoryProvider>  
    <BrowserRouter>
        <Header/>
        <Box style={{marginTop: '64px'}}>
        <Routes>
          <Route path="/" element={<Home/>} exact={true}/>
          <Route path="/detailView/:id" element={<DetailView/>}/>
          <Route path="/createPost" element={<CreatePost/>} exact={true}/>
          <Route path="/updatePost/:id" element={<UpdatePost/>}/>
        </Routes>  
        </Box>
        
    </BrowserRouter>
    </CategoryProvider>
    </AccountProvider>
    
  );
}

export default App;
