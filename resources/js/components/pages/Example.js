import React from 'react';
import {Button} from '@material-ui/core';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">React導入できたわな？？</div>
                        <div className="card-body">ページ下に移動できた？？</div>
                        <Button color="secondary" variant="contained" href={"/"}>Homeに遷移ボタン</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Example;
