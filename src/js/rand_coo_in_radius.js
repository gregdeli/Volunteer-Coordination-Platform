function find_point(base, R){
    //give base coordinates and the distance in meters from the base
    //and it will give you the coordinates of 2 random points with that distance
    function find_akra(d) {
        let step = 0.00000001;
        let xmin,xmax;
        for (xmin = parseFloat(base[0]); map.distance([base[0],base[1]],[xmin,base[1]]) < d; xmin-=step) {
        }
        for (xmax = parseFloat(base[0]); map.distance([base[0],base[1]],[xmax,base[1]]) < d; xmax+=step) {
        }
        return [xmin,xmax];
    }
    function getRandomFl(min, max) {
        return Math.random()*(max-min) + min;
    }
    function get_y(x, R) {
        let step = 0.00000003;
        let y1, y2;
        for (y1 = parseFloat(base[1]); map.distance([base[0],base[1]],[x,y1]) < R; y1-=step) {
        }
        for (y2 = parseFloat(base[1]); map.distance([base[0],base[1]],[x,y2]) < R; y2+=step) {
        }
        return [y1,y2];
    }

    let x_akra = find_akra(R);
    let x = getRandomFl(x_akra[0],x_akra[1]);
    let y = get_y(x,R);

    return [[x,y[0]],[x,y[1]]];
}
let base = [38.279359,21.752501];
let a=find_point(base, 5000);
console.log(a);
console.log(map.distance([base[0],base[1]],[a[1][0],a[1][1]]));

