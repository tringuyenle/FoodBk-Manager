/**
 * @author Hung, Ho Duc <https://github.com/iduchungho>
 * @date 2022-10-29
 */

import React from "react";

import './styles/Logo.css';

export default function Logo() {
    return (
        <>
            <div className='logo'>
                <img
                    src='https://e-learning.hcmut.edu.vn/pluginfile.php/1/core_admin/logocompact/300x300/1665455903/logoBK.png'
                    alt='logo'
                    className='icon'
                />
                <div className='txt'>
                    <div className='BK'>
                        BK
                    </div>
                    <div className='food'>
                        FoodCourt
                    </div>
                </div>
            </div>
        </>
    );
}