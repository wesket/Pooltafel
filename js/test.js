
function borderCollision() {


    for (let i in balls) {


        if(((balls[i].position.x <= (-tableEdgeX) && ballsVel[i].vx<0) || (balls[i].position.x >= tableEdgeX && ballsVel[i].vx>0)) && ballsVel[i].p === true ){
            ballsVel[i].vx = - ballsVel[i].vx;
        }


        if(((balls[i].position.y <= (-tableEdgeY) && ballsVel[i].vy<0) || (balls[i].position.y >= tableEdgeY && ballsVel[i].vy>0)) && ballsVel[i].p === true ){
            ballsVel[i].vy = - ballsVel[i].vy;
        }

    }
}

function collisionDetection(){
    let icnt = 0;
    let jcnt = 0;
    let collDet = 0;



    for (let i in balls) {
        for (let j in balls) {
            if(i!=j && jcnt > icnt && ballsVel[i].p == true && ballsVel[j].p == true) {
                //	Calcolo i delta di spostamento tra le due palline in x e in y per calcolare la distanza
                dx = Math.abs(getX(j) - getX(i));
                dy = Math.abs(getY(j) - getY(i));
                distance = Math.sqrt(dx*dx + dy*dy);

                if(distance <= 2*ballRadius) {					//	Se sono in collisione e se non lo erano al ciclo precedente
                    if(ballsFlag[icnt][jcnt] == 0) {
                        ballsFlag[icnt][jcnt] = 1;			//	Setto i flag di collisione a 1
                        resolveCollision(i, j, icnt, jcnt);	//	Lancio la resolve collision
                        collDet += 1;						//	Notifico che c'è stata almeno una collisione
                    }
                } else {										//	Se non sono più in collisione
                    ballsFlag[icnt][jcnt] = 0;					//	Setto i flag di collisione a 0
                }
            }
            jcnt += 1;
        }
        icnt += 1;
        jcnt = 0;
    }

    if(collDet!=0){
        icnt = 0;
        for (var i in balls) {
            finalV = getCollisionVelocity(i);
            finalV[0] += vxUp[icnt];
            finalV[1] += vyUp[icnt];
            setCollisionVelocity(i, finalV);
            icnt += 1;
        }
        controlVelocity();
    }

    for(i=0; i < vxUp.length; i++){
        vxUp[i] = 0;
        vyUp[i] = 0;
    }

function resolveCollision(i, j, icnt, jcnt) {


    p1 = new Array(getX(i), getY(i));
    p2 = new Array(getX(j), getY(j));


    let n = subtract(p1, p2);
    let un = unit(n);




    p1 = add(p1, scale(un, dr));
    p2 = add(p2, scale(un, -dr));
    setPosition(i, p1);
    setPosition(j, p2);


    n = subtract(p1, p2);
    un = unit(n);
    let ut = new Array(-un[1], un[0]);


    let v1 = getCollisionVelocity(i);
    let v2 = getCollisionVelocity(j);


    let v1n = dot(un, v1);
    let v1t = dot(ut, v1);
    let v2n = dot(un, v2);
    let v2t = dot(ut, v2);

    let v1nNew =  v2n;
    let v2nNew =  v1n;


    v1 = scale(un, v1nNew);
    v2 = scale(ut, v1t);
    let final_1 = add(v1, v2);
    if(Math.abs(final_1[0])<1/10000)
        final_1[0] = 0;
    if(Math.abs(final_1[1])<1/10000)
        final_1[1] = 0;

    vxUp[icnt] = vxUp[icnt] - getCollisionVelocity(i)[0] + final_1[0];
    vyUp[icnt] = vyUp[icnt] - getCollisionVelocity(i)[1] + final_1[1];


    v1 = scale(un, v2nNew);
    v2 = scale(ut, v2t);
    let final_2 = add(v1, v2);
    if(Math.abs(final_2[0])<1/10000)
        final_2[0] = 0;
    if(Math.abs(final_2[1])<1/10000)
        final_2[1] = 0;

    vxUp[jcnt] = vxUp[jcnt] -getCollisionVelocity(j)[0] + final_2[0];
    vyUp[jcnt] = vyUp[jcnt] -getCollisionVelocity(j)[1] + final_2[1];

}

function holes() {

    for(i in balls) {

        let pos = new Array(balls[i].position.x, balls[i].position.y);

        for(j in holesPos){

            let dx = pos[0] - holesPos[j].x;
            let dy = pos[1] - holesPos[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist <= 15 && holesPos[j].x == 0 && ballsVel[i].p == true){
                setVisible(i, false);
            }
            if(dist <= 20 && holesPos[j].x != 0 && ballsVel[i].p == true){
                setVisible(i, false);
            }
        }
    }

    if(ballsVel.ball0.p == false) {
        three.ballLight.position.z = 1000000;
        three.shot_line.visible = false;
    }
}}
