import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import MainTable from "../MainTable";
import PostForm from "../PostForm";

const headerList = ['名前', 'タスク内容', '編集', '完了'];

const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    },
    tableHead: {
        backgroundColor: purple['A100'],
    },
}));

function Home() {
    const classes = useStyles();
    const [posts, setPosts] = useState([""]);
    const [formData, setFormData] = useState({name: '', content: ''});　　　　//追記

    useEffect(() => {
        getPostsData();
    }, [])
    const getPostsData = () => {
        axios.get('/api/posts')
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }
    const inputChange = (e) => {
        const key = e.target.name;
        formData[key] = e.target.value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    const createPost = async () => {
        if (formData == '') {
            return;
        }
        await axios.post('/api/post/create', {
            name: formData.name,
            content: formData.content
        })
            .then((res) => {
                const tempPosts = posts
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');
            })
            .catch(error => {
                console.log(error);
            });
    }
    const deletePost = async (id) => {
        await axios.post('/api/delete', {
            id: id
        }).then((res) => {
            console.error("sdaddsa")
            setPosts(res.data);
        })
            .catch(error => {
                console.log(error);
            });
    }

    let rows = [];
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" key={post.id} href={`/post/edit/${post.id}`}
                             variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained" href="/"
                               onClick={() => deletePost(post.id)}>完了</Button>,
        })
    );
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <PostForm data={formData} btnFunc={createPost} inputChange={inputChange}/>
                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows}/>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
