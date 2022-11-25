import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import MainTable from "../MainTable";
import PostForm from "../PostForm";

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

//スタイルの定義
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
    //定義したスタイルを利用するための設定
    const classes = useStyles();
    const [posts, setPosts] = useState([""]);
    const [formData, setFormData] = useState({name: '', content: ''});　　　　//追記

    useEffect(() => {
        getPostsData();
    }, [])
    const getPostsData = () => {
        axios.get('/api/posts')
            .then(response => {
                setPosts(response.data);     //バックエンドから返ってきたデータでpostsを更新する
                console.log(response.data);　//取得データ確認用のconsole.log()
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }
    //入力がされたら（都度）入力値を変更するためのfunction
    const inputChange = (e) => {
        const key = e.target.name;
        formData[key] = e.target.value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    const createPost = async () => {
        //空だと弾く
        if (formData == '') {
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/post/create', {
                name: formData.name,
                content: formData.content
            })
            .then((res) => {
                //戻り値をtodosにセット
                const tempPosts = posts
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');
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
            editBtn: <Button color="secondary" key={post.id} href={`/post/edit/${post.id}`} variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
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
