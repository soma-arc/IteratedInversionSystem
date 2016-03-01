# Iterated Inversion System
Examples of the algorithm for drawing image of Schottky groups by WebGL and GLSL.
This is called Iterated Inversion System (IIS). It is easy to
parallelize and render images fast. It can be used to render
2-dimensional kissing Schottky groups and also 3-dimensional kissing
Schottky groups.  
3D examples may require high GPU power, so run these examples at your own risk.  
Similar examples are also available on [my Shadertoy page](https://www.shadertoy.com/user/soma_arc). You can edit and run code easily. Some examples may run faster than running on my WebGL implementation.
## Examples
### Kissing Schottky
This is basic kissing Schottky group composed by four circles.
#### Orbit of the Schottky circles
![Kissing Schottky](images\kissingSchottky.png)
#### Limit set
![Kissing Schottky limit set](images\kissingSchottkyLimitSet.png)
### Apollonian packing
This pattern is called apollonian packing. There are other algorithms for displaying it.
![Apollonian packing](images\apollonianPacking.png)
### Group composed by 9 circles
Actually, this is not Schottky group because Schottky groups are composed by even number of circles/spheres. However we can use this algorithm if groups are composed by circles/spheres.  
![Nine Circles](images\nineCircles.png)
### 3D kissing Schottky based on octahedron
This group is composed by 6 Schottky spheres at the position of the vertexes
of an octahedron.  
#### Orbit of a sphere
![3D kissing Schottky oct](images\3dOct.png)
#### Limit set
![3D kissing Schottky oct limit set](images\3dOctLimitSet.png)
#### Extra
Depending on the parameter, we can get such interesting image.
![3D kissing Schottky oct ext](images\3dOctExt.png)
### 3D kissing Schottky based on cube
This group is composed by 8 Schottky spheres at the position of the vertexes
of a cube.  
#### Orbit of a sphere
![3D kissing Schottky cube 2](images\3dCube.png)
#### Limit set
![3D kissing Schottky cube 2](images\3dCubeLimitSet.png)
### Indra's Bubbles
[Tokyo Demo Fest 2016](http://tokyodemofest.jp/2016/) GLSL Graphics Compo 2nd Place.  
This demo is using this algorithm.
![Nine Circles](images\indra.png)

## License
### Indra's Bubbles
Creative Commons Attribution-ShareAlike 3.0 Unported
### Others
MIT
