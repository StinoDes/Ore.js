import Ore from 'ore-js';
window.Ore = Ore;

const { div, h1, p, nav, input, a } = Ore.Oven.recipes;

const Logo = Ore.Oven.bake('Logo', {

    build: function () {
        return a({textDecoration: 'none'}, [
            h1({
                text: 'LOGO',
                color: '#f5f5f5',
                padding: '35px',
                fontSize: '20px',
                margin: '0',
                fontFamily: 'sans-serif'
            })
        ]);
    }

});

const Nav = Ore.Oven.bake('Nav', {

    build: function () {
        return nav({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '90px',
            backgroundColor: '#329843'
        }, [
            Logo()
        ]);
    }

});

const ListRow = Ore.Oven.bake('ListRow', {

    build: function () {
        return div({padding: '20px', marginBottom: '1px', backgroundColor: '#fefefe'}, [
            p({fontSize: '25px', color: '#424242', text: this.conf.item})
        ])
    }

});


const ListInput = Ore.Oven.bake('ListInput', {

    input: '',

    build: function () {
        return div({backgroundColor: '#fefefe'}, [
            input({
                type: 'text', fontSize: '25px', color: '#757575', margin: '0', padding: '20px',
                border: 'none', outline: 'none', width: '80%', oninput: (function (e) {
                    this.input = e.target.value;
                }).bind(this)
            }),
            a({
                borderRadius: '50%', display: 'block', backgroundColor: '#329843', position: 'absolute',
                bottom: '20px', right: '20px', width: '40px', height: '40px', click: (function () {
                    items.push(this.input);
                    Ore.Oven.buildTo(List, Ore.collect('body'));
                }).bind(this)
            })
        ])
    }

});


var items = [];

const List = Ore.Oven.bake('List', {

    build: function () {
        return div({
                position: 'relative',
                borderRadius: '5px',
                margin: '130px 30% 0 30%',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 8px',
                overflow: 'hidden'
            },
            [].concat(this.renderRows(), [ListInput()]))
    },

    renderRows: function () {
        return items.map(function (item) {
            return ListRow({item})
        });
    }

});

Ore.collect('body').do({backgroundColor: '#f3f3f3', fontFamily: 'sans-serif'});
Ore.Oven.buildTo(Nav, Ore.collect('body'));
Ore.Oven.buildTo(List, Ore.collect('body'));