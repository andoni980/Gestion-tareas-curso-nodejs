require( 'colors' );
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTasksList,
  confirmDelete,
  showCheckList } = require( './helpers/inquirer' );

const { saveFile, readDB } = require( './helpers/saveFile' );

const Tasks = require( './models/tasks' );
// const Task = require( './models/task' );



const main = async () => {

  let opt = '';

  const tasks = new Tasks();

  const taskDB = readDB();

  if ( taskDB ) {
    tasks.loadTaskFromArray( taskDB );
  }

  do {
    opt = await inquirerMenu();

    switch ( opt ) {
      case '1':
        const desc = await readInput( 'Descripción:' );
        tasks.createTask( desc );
        break;
      case '2':
        tasks.fullList( taskDB );
        break;
      case '3':
        tasks.listCompletedPending( true );
        break;
      case '4':
        tasks.listCompletedPending( false );
        break;
      case '5':
        const ids = await showCheckList( tasks.listArr );
        tasks.toggleCompleteds( ids );
        break;
      case '6':
        const id = await deleteTasksList( tasks.listArr );
        if ( id !== '0' ) {
          const ok = await confirmDelete( '¿Seguro que quieres eliminar la tarea?' );
          if ( ok ) {
            tasks.deleteTask( id );
            console.log( 'Tarea eliminada' );
          }
        }
        break;

    }

    saveFile( tasks.listArr );

    await pause();

  } while ( opt !== '0' );
}

main();