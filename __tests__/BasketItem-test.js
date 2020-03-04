"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import BasketItem from '../components/BasketItem';

test('работа кнопки Удалить BasketItem', ()=>{
    let item =  {
        name: "Телевизор Samsung UE32N5300AU",
        price: 6842.7,
        img: "/img/1e0a4d4b1f5455f93db9b95dd2bdf605.jpeg",
        id: "40786.80",
        info: "32' 1920x1080 (Full HD), частота матрицы 50 Гц, индекс динамичных сцен 500, Smart TV (Samsung Tizen), HDR, Wi-Fi"
    };

    const component = renderer.create(
        <BasketItem item={item}/>
    );
    console.log(component);
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    const buttonElem = component.root.find( el => {
        console.log(el.props.className);
        el.props.className=="controlButton"});
    console.log(buttonElem);
    buttonElem.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    buttonElem.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
});
