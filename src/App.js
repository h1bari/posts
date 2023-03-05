import {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'JS - is programming language'},
        {id: 2, title: 'JS 2', body: 'JS - is programming language'},
        {id: 3, title: 'JS 3', body: 'JS - is programming language'},
    ])

    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery,setSearchQuery] = useState('')

    function getSortedPosts() {
        if(selectedSort){
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts
    }

    const sortedPosts = getSortedPosts()

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }
    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MyInput type='text'
                         value={searchQuery}
                         onChange={e => setSearchQuery(e.target.value)}
                         placeholder='Search...'
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue='Sorted by'
                    options={[
                        {value: 'title', name: 'By name'},
                        {value: 'body', name: 'By description'}
                    ]}
                />
            </div>
            {posts.length
                ? <PostList remove={removePost} posts={sortedPosts} title='List №1'/>
                : <h1 style={{textAlign: 'center'}}>List is empty</h1>
            }
        </div>
    );
}

export default App;
