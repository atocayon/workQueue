// @flow
import React, {useState, useEffect} from 'react';

export default function List(props) {
  return (
    <>
        <table className={"table table-borderless"}>
            <thead>
                <tr>
                    <th>Requisitioner</th>
                    <th>File Title</th>
                    <th>Destination</th>
                    <th>Date Requested</th>
                </tr>
            </thead>
        </table>
    </>
  );
};