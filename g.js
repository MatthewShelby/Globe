
class Geometry
  degToRad: (d) -> return d / 180 * Math.PI
toRadians: (lat, long) ->
      lat: @degToRad(-lat) + Math.PI / 2
long: @degToRad(-long) + Math.PI / 2
toSpherical: (lat, long, r) ->
      ll = @toRadians(lat, long)
return {
      lat: ll.lat,
      long: ll.long
      radius: r
}
sphericalToXYZ: (spherical) ->
    return {
      # THREE.JS coordinate system is xzy instead of xyz as compared to standard spherical equations
      x: spherical.radius * Math.cos(spherical.long) * Math.sin(spherical.lat)
      y: spherical.radius * Math.cos(spherical.lat)
      z: spherical.radius * Math.sin(spherical.long) * Math.sin(spherical.lat)
}
latLongToXYZ: (lat, long, radius) =>
      spherical = @toSpherical(lat, long, radius)
return @sphericalToXYZ(spherical)

  # return THREE.js vector
latLongToVector3: (lat, long, radius) ->
      xyz = @latLongToXYZ(lat, long, radius)
return new THREE.Vector3(xyz.x, xyz.y, xyz.z)

window.Geometry = Geometry
