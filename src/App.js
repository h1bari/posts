import {useMemo, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'JS - is programming language'},
        {id: 2, title: 'JS 2', body: 'JS - is programming language'},
        {id: 3, title: 'JS 3', body: 'JS - is programming language'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal,setModal] = useState(false)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort,filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List №1'/>
        </div>
    );
}

export default App;
