function RK(RS,q){
    var h = h_time;
    var k1 = RS(q)
    var k2 = RS(q.add(k1.multiply(h/2)))
    var k3 = RS(q.add(k2.multiply(h/2)))
    var k4 = RS(q.add(k3.multiply(h)))
    return q.add( k1.add(k2.multiply(2)).add(k3.multiply(2)).add(k4).multiply(h/6) );
}


function CreateRS(N,K,G,L){
    return function(q){   
        X = Vector.Zero(2*N);
        X.elements[0] = q.elements[1];
        X.elements[1] = -L*q.elements[1] - Math.sin(q.elements[0]) + G + K*( Math.sin(q.elements[2] - q.elements[0]) );
        var n = 0; 
        while (n < 2*N-4){
            X.elements[n+2] = q.elements[n+3]
            X.elements[n+3] = -L*q.elements[n+3] - Math.sin(q.elements[n+2]) + G + K*( Math.sin(q.elements[n+4] - q.elements[n+2]) + Math.sin(q.elements[n] - q.elements[n+2]) )
            n+=2
        } 
        X.elements[2*N-2] = q.elements[2*N-1]
        X.elements[2*N-1] = -L*q.elements[2*N-1] - Math.sin(q.elements[2*N-2]) + G + K*( Math.sin(q.elements[2*N-4] - q.elements[2*N-2]) )
        return X
    }
}

function getState(X_last){
    var eps = 1e-5;
    var short_res = [];
    var res = "|";
    var values = [];
    for (i = 0;i < N;i++) values.push({"phase": X_last[2*i]%(2*Math.PI) ,"index":i+1,});
    values.sort((a,b)=>{  if (a["phase"] > b["phase"]) return 1; else return -1;});

    i = 1
    while (i<N){
        var chunk = []
        while( i < N && Math.abs(values[i]["phase"] - values[i - 1]["phase"] ) < eps ){
            chunk.push(`${values[i - 1]["index"]}`);
            i+=1
        }
        chunk.push(`${values[i-1]["index"]}`);
        short_res.push(""+chunk.length);
        chunk.sort((a,b)=>{ if (Number(a) > Number(b)) return 1; else return -1;});
        res+=chunk.join("=")+"|";
        i+=1
    }
    if (i==N){
        res+= `${values[i-1]["index"]}|`;
        short_res.push("1");
    }
    res+=" ~ " + short_res.join(";");
    return res
}