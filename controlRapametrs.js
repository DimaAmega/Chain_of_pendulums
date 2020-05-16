function pretubrations(N_of_element,forse){
    q.elements[2*N_of_element-1]+=forse;
}
function updateK(newK){
    K = newK;
    k_input.value = K;
    RS = CreateRS(N,K,G,L);
}
function updateL(newL){
    L = newL;
    RS = CreateRS(N,K,G,L);
}
function updateG(newG){
    G = newG;
    RS = CreateRS(N,K,G,L);
}
function addElems(number) {
    for (let i = 0; i < number; i++) {q.elements.push(0,0); N++;}
    RS = CreateRS(N,K,G,L);
    width_px = Canvas.offsetWidth/N;
}
function removeElems(number) {
    for (let i = 0; i < number; i++) { q.elements.pop(); q.elements.pop(); N--;}
    RS = CreateRS(N,K,G,L);
    width_px = Canvas.offsetWidth/N;
}
function updateXSpeed(new_x_speed){
    x_speed = new_x_speed;
}
