import React, { useEffect, useState } from 'react';
import './App.scss';
import Paging from './component/pagination';
import PostList from './component/PostList';
import queryString from 'query-string';
import PostFilterForm from './component/PostFilterForm';
import Clock from './component/Clock';
function App() {
    //post list
    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] =useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1,
    })

    const [filters, setFilters] = useState({
        _litmi: 10,
        _page: 1,
        title_like: '',
    })
    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                //get data
                const { data , pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchPostList();
    },[filters])

    //paging
    const onPageChange = (newPage) => {
        setFilters({
            ...filters,
            _page: newPage,
        })
    }

    //search
    const handleSubmit = (filterSearch) => {
        console.log(filterSearch);
        setFilters({
            ...filters,
            _page: 1,
            title_like: filterSearch.value
        })
    } 

    //clock
    const [showClock, setShowClock] = useState(true);
    const checkClock = (showClock) => {
        const check = showClock ? false : true;
        setShowClock(check);
    }
    return (
        <div className="App">
            <h1>DEMO PAGING</h1>
            <PostFilterForm onSubmit={handleSubmit}/>
            <PostList posts = {postList}/>
            <Paging pagination = {pagination} onPageChange={onPageChange}/>

            <h1>CLOCK</h1>
            {showClock ? <Clock /> : ''}
            <button type="button" className="btn btn-success"onClick={() => checkClock(showClock)}>Hide Clock</button>
        </div>
    );
}

export default App;
