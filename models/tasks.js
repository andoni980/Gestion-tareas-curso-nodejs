/* 
_list: {
    'uuid-21342134-234234-3:{id12,desc:asd,endData:23-4-24}'
} */
const Task = require( './task' );

class Tasks {

    _list = {};

    get listArr () {

        const list = [];
        Object.keys( this._list ).forEach( key => {
            const task = this._list[ key ];
            list.push( task );
        } );
        return list;
    }

    contructor () {
        this._list = {};
    }

    deleteTask ( id = '' ) {
        if ( this._list[ id ] ) {
            delete this._list[ id ];
        }
    }

    loadTaskFromArray ( tasks = [] ) {
        tasks.forEach( task => {
            this._list[ task.id ] = task;

        } );
    }

    createTask ( desc = '' ) {
        const task = new Task( desc );
        this._list[ task.id ] = task;

    }

    fullList () {

        console.log();
        this.listArr.forEach( ( task, i ) => {

            const idx = `${ i + 1 }.`.green;
            const { desc, endDate } = task;
            const state = ( endDate )
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log( `${ idx } ${ desc } :: ${ state }` );

        } );
        console.log();
    }

    listCompletedPending ( completed = true ) {

        console.log();

        let counter = 0;

        this.listArr.forEach( ( task ) => {

            const { desc, endDate } = task;
            const state = ( endDate )
                ? 'Completada'.green
                : 'Pendiente'.red;
            if ( completed ) {
                if ( endDate ) {
                    counter += 1;
                    console.log( `${ ( counter + '.' ).green } ${ desc } ${ '=>'.yellow } La tarea se completó: ${ endDate.green }` );
                }

            } else {
                if ( !endDate ) {
                    counter += 1;
                    console.log( `${ ( counter + '.' ).green } ${ desc } ${ '=>'.random }  ${ state }` );
                }
            }
        } );
        console.log();
    }

    toggleCompleteds ( ids = [] ) {

        ids.forEach( id => {

            const task = this._list[ id ];
            if ( !task.endDate ) {
                task.endDate = new Date().toISOString();
            }

        } );

        this.listArr.forEach( task => {
            if ( !ids.includes( task.id ) ) {
                this._list[ task.id ].endDate = null;
            }
        } )

    }
}



module.exports = Tasks;