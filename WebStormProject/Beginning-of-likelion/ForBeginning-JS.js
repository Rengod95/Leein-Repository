let n, m = prompt();


if (0<m<1001 && 0<n<1001){
    for (i = 0; i<m; i++){
        for(j=0; j<n; j++){
            document.write('*')
        }
        document.write('<br>');
    }
}