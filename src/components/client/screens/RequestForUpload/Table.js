import React from "react";


export default function Table(props){

    return (
        <div>
            <table className={"table"}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Upload destination</th>
                        <th>File name</th>
                        <th>File size</th>
                        <th>Validator</th>
                        <th>Date/Time Requested</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}