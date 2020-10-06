//Constructor function to store the app state.    
function AppState () {
            
    this.urlList = [],
    this.tempData = [],
    this.urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi

}
//------------------------------------------
//Adding methods to the function prototype:

AppState.prototype.resetState = function() {
    this.urlList = [],
    this.tempData = [],
    this.urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi  
}

//--------------------------------------
//initializing appState of the app
const appState = new AppState();

//exporting the app state.
module.exports = {
    appState
};