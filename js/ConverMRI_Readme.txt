Very Important: ConvertMRI must be started with "--max-old-space-size=4096" as a modifier or it will run out of memory.
Must also be placed in same folder as other js files.

Parameters:

Parameters are written in the url, starting with a '?' and each parameter seperated with a '&'.
Note that folder seperators should be backslashes.

Example "http://mydomain/?from=C:\voxelfiles\water.json&to=C:\convertedfiles&name=waterBody2&minIntensity=0.4"


REQUIRED

from: Location of file to be converted.
to: Target folder for new file.
name: Name of new file after conversion, do not include type, eg write "newfile" NOT "newfile.obj".
minIntensity: Sets bottom limit for intensity to filter out, recommend setting to 0.3. Any lower and you may get noise data in your converted model.

OPTIONAL

stretch: How much you want the model to stretch along the z-axis (scanned layers). If the length between layers is longer than the distance between voxels on the height/width simply enter the proper multiplier here. Defaults to 1.
fileType: Set to 'json' if you want the smaller JSON file. Set to 'obj' or leave it out if you want the full OBJ file. Set 'both' if you want both files at once. Defaults to 'obj'.


