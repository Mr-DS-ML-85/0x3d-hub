# MATLAB

> This quick reference cheat sheet provides an example introduction to using the [MATLAB](https://mathworks.cn/) scientific computing language to get started quickly

Category: Programming

## Getting Started

### Introduction

MATLAB is short formatrix laboratory

- MATLAB official website

### Matrix and array operations

MATLAB allows you to use a single arithmetic operator or function to manipulate all values in a matrix

```matlab
a + 10

```

MATLAB will execute the above statement and return the following results:

```
ans = 3Ã3
    11    13    15
    12    14    16
    17    18    20

```

```matlab
sin(a)

```

MATLAB will execute the above statement and return the following results:

```
ans = 3Ã3
    0.8415    0.1411   -0.9589
    0.9093   -0.7568   -0.2794
    0.6570    0.9894   -0.5440

```

To transpose a matrix, use single quotes (')

```matlab
a'

```

```
ans = 3Ã3
     1     2     7
     3     4     8
     5     6    10

```

Perform standard matrix multiplication using the*operator, which computes the inner product between rows and columns

```matlab
p = a*inv(a)

```

```
p = 3Ã3
    1.0000         0         0
         0    1.0000         0
         0         0    1.0000

```

### concatenation

Concatenation is the process of joining arrays to form larger arrays. In fact, the first array is formed by
concatenating its elements. Pairs of square brackets[]are concatenation operators.

```matlab
A = [a,a]

```

```
A = 3Ã6

     1     3     5     1     3     5
     2     4     6     2     4     6
     7     8    10     7     8    10

```

Concatenating arrays next to each other using commas is called horizontal concatenation. Each array must have the same
number of rows. Likewise, semicolons can be used for vertical concatenation if the arrays have the same number of
columns.

```matlab
A = [a; a]

```

```
A = 6Ã3

     1     3     5
     2     4     6
     7     8    10
     1     3     5
     2     4     6
     7     8    10

```

### Matrices and arrays

To create an array with four elements per row, separate elements with commas (,) or spaces

```matlab
a = [1 2 3 4]

```

MATLAB will execute the above statement and return the following results:

```
a = 1Ã4
     1     2     3     4

```

#### Create a matrix with multiple rows

```matlab
a = [1 3 5; 2 4 6; 7 8 10]

```

```
a = 3Ã3
     1     3     5
     2     4     6
     7     8    10

```

#### 5Ã1 column vector of zeros

```matlab
z = zeros(5,1)

```

```
z = 5Ã1
     0
     0
     0
     0
     0

```

### Complex number

A complex number has a real part and an imaginary part, and the imaginary unit is the square root of -1.

```matlab
sqrt(-1)

```

```
ans = 0.0000 + 1.0000i

```

To represent the imaginary part of a complex number, use i or j.

```matlab
c = [3+4i, 4+3j; -i, 10j]

```

```
c = 2Ã2 complex

   3.0000 + 4.0000i   4.0000 + 3.0000i
   0.0000 - 1.0000i   0.0000 +10.0000i

```

## Basic knowledge

### Input the command

| - | - |
| --- | --- |
| ans | Most recently calculated answer |
| clc | Clear the command line window |
| diary | Record the text of the command line window into the log file |
| format | Set the output display format |
| home | Send cursor reset |
| iskeyword | Determine if the input is aMATLABkeyword |
| more | Control paging output in the command line window |
| commandwindow | Select command window |
| commandhistory | Open command history window |

#### Objects

| - | - |
| --- | --- |
| DisplayFormatOptions | Output display format in the command line window |

### Matrices and Arrays

Create and combine arrays

| - | - |
| --- | --- |
| zeros | Create an array of all zeros |
| ones | Create an array of all 1s |
| rand | Uniformly distributed random numbers |
| true | Logical value 1 (true) |
| false | logical 0 (false) |
| eye | identity matrix |
| diag | Create a diagonal matrix or get the diagonal elements of a matrix |
| blkdiag | block diagonal matrix |
| cat | Concatenate arrays. |
| horzcat | Concatenate arrays horizontally |
| vertcat | Concatenate arrays vertically |
| repelem | Repeat array element copy |
| repmat | Repeat array copy |

Create grid

| - | - |
| --- | --- |
| linspace | Generate linearly spaced vectors |
| logspace | Generate logarithmic spaced vectors |
| freqspace | frequency spacing of frequency response |
| meshgrid | 2D and 3D grids |
| ndgrid | Rectangular grid in N-dimensional space |

Determine size, shape and order

| - | - |
| --- | --- |
| length | The length of the largest array dimension |
| size | array size |
| ndims | Number of dimensions of the array |
| numel | the number of array elements |
| isscalar | Determine whether the input is a scalar |
| issorted | Determine if the array is sorted |
| issortedrows | Determine whether the rows of a matrix or table are sorted |
| isvector | Determine whether the input is a vector |
| ismatrix | Determine whether the input is a matrix |
| isrow | Determine whether the input is a row vector |
| iscolumn | Determine whether the input is a column vector |
| isempty | Determine whether the array is empty |

Refactor and rearrange

| - | - |
| --- | --- |
| sort | Sort array |
| elementssortrows | Sort matrix rows or table rows |
| flip | Flip the order of elements |
| fliplr | Flip the array from left to right |
| flipud | Flip the array from top to bottom |
| rot90 | Rotate an array by 90 degrees |
| transpose | Transpose a vector or matrix |
| ctranspose | complex conjugate transpose |
| permute | permute array dimension |
| ipermute | Inverse permutation of array dimensions. |
| circshift | Circular shift array |
| shiftdim | shift array dimension |
| reshape | Reshape array |
| squeeze | Remove dimensions of length 1 |

index

| - | - |
| --- | --- |
| colon | vector creation, array subscript and `for` loop iteration |
| end | Terminate a code block or indicate the maximum array index |
| ind2sub | Convert linear index to subscript |
| sub2ind | Convert subscript to linear index |

### Value type

Create numeric variables

| - | - |
| --- | --- |
| double | double precision array |
| single | single precision array |
| int8 | 8-bit signed integer array |
| int16 | 16-bit signed integer array |
| int32 | 32-bit signed integer array |
| int64 | 64-bit signed integer array |
| uint8 | Array of 8-bit unsigned integers |
| uint16 | 16-bit unsigned integer array |
| uint32 | 32-bit unsigned integer array |
| uint64 | 64-bit unsigned integer array |

Convert between numeric types

| - | - |
| --- | --- |
| cast | Convert variables to different data types |
| typecast | Convert data types without changing the underlying data |

Query type and value

| - | - |
| --- | --- |
| allfinite | Determine if all array elements are finite |
| anynan | Determine if any array element is NaN |
| isinteger | Determine whether the input is an integer array |
| isfloat | Determine whether the input is a floating-point array |
| isnumeric | Determine whether the input is a numeric array |
| isreal | Determine whether the array uses complex storage |
| isfinite | Determine which array elements are finite |
| isinf | Determine which array elements are infinite |
| isnan | Determine which array elements are NaN |

Value range

| - | - |
| --- | --- |
| eps | Floating point relative precision |
| flintmax | The largest consecutive integer in floating point format |
| Inf | Create an array with all values `Inf` |
| intmax | The maximum value of a specific integer type |
| intmin | The minimum value of a specific integer type |
| NaN | Create an array where all values are `NaN` |
| realmax | The largest positive floating point number |
| realmin | Minimum standard floating point number |

### Loops and conditional statements

| - | - |
| --- | --- |
| if, elseif, else | Execute statement when condition is true |
| switch, case, otherwise | Execute one of multiple sets of statements |
| for | A `for` loop used to repeat a specified number of times |
| while | A `while` loop that executes repeatedly while a condition is true |
| try, catch | Execute the statement and catch the resulting error |
| break | Terminate execution of a for or while loop |
| return | Return control to the calling script or function |
| continue | Passes control to the next iteration of a `for` or `while` loop |
| pause | Temporarily suspend the execution of `MATLAB` |
| parfor | Parallel for loop |
| end | Terminate a code block or indicate the maximum array index |

{.style-list}

### Array of strings

| - | - |
| --- | --- |
| string | string array |
| strings | Create a string array that does not contain characters |
| join | Merge strings |
| plus | Add numbers, append strings |

### Character array

| - | - |
| --- | --- |
| char | character array |
| cellstr | Convert to a cell array of character vectors |
| blanks | Create a blank character array |
| newline | Create newline |

### Character or string array

| - | - |
| --- | --- |
| compose | Format data into multiple strings |
| sprintf | Format data as string or character vector |
| strcat | Concatenate strings horizontally |
| append | Merge strings |

### Char or string -convert input arguments

| - | - |
| --- | --- |
| convertCharsToStrings | convert character array to string array, other arrays remain unchanged |
| convertStringsToChars | Convert string array to character array, other arrays remain unchanged |
| convertContainedStringsToChars | Convert an array of strings at any level of a cell array or structure {.style-list} |

### CHAR or STRING -convert between numeric and string

| - | - |
| --- | --- |
| double | double precision array |
| string | string array |
| str2double | Convert a string to a double value |
| num2str | Convert numbers to character arrays |

### Character or string -determine type and attributes

Type of data

| - | - |
| --- | --- |
| ischar | Determine whether the input is a character array |
| iscellstr | Determines if input is a cell array of character vectors |
| isstring | Determine whether the input is an array of strings |
| isStringScalar | Determine whether the input is a string array containing one element |

Text attribute

| - | - |
| --- | --- |
| strlength | string length |
| isstrprop | Determine which characters in the input string belong to the specified category |
| isletter | Determine which characters are letters |
| isspace | Determine which characters are whitespace characters |

### character or string -find and replace

Look up

| - | - |
| --- | --- |
| contains | Determine if there is a pattern in the string |
| matches | Determine if a pattern matches a string |
| count | Count the number of occurrences of a pattern in a string |
| endsWith | Determine if a string ends with a pattern |
| startsWith | Determine whether a string starts with a pattern |
| strfind | Find a string in other strings |
| sscanf | Read formatted data from a string |

replace

| - | - |
| --- | --- |
| replace | Find and replace one or more substrings |
| replaceBetween | Replace the substring between the start and end |
| strrep | Find and replace substring |

### String matching pattern -build pattern

| - | - |
| --- | --- |
| pattern | pattern for searching and matching text |

### String match pattern -character match pattern

| - | - |
| --- | --- |
| alphanumericsPattern | match alphanumeric characters |
| characterListPattern | Match characters in the list |
| digitsPattern | Match digit characters |
| lettersPattern | match letter pattern |
| whitespacePattern | match whitespace characters |
| wildcardPattern | Match as few characters of any type as possible |

### String matching pattern -pattern search rules

| - | - |
| --- | --- |
| optionalPattern | Make pattern matching optional |
| possessivePattern | Match pattern without backtracking |
| caseSensitivePattern | Match patterns in a case-sensitive manner |
| caseInsensitivePattern | Match patterns in a case-insensitive manner |
| asFewOfPattern | The number of pattern matches should be as few as possible |
| asManyOfPattern | Pattern matching as many times as possible |

### String matching pattern -Boundary pattern

| - | - |
| --- | --- |
| alphanumericBoundary | Matches the boundary between alphanumeric and non-alphanumeric characters |
| digitBoundary | Matches the boundary between digit characters and non-digit characters |
| letterBoundary | Matches the boundary between alphabetic and non-alphabetic characters |
| whitespaceBoundary | Matches the boundary between whitespace and non-whitespace characters |
| lineBoundary | match the beginning or end of a line |
| textBoundary | match the beginning or end of the text |
| lookAheadBoundary | match the boundary before the specified pattern |
| lookBehindBoundary | Boundary after matching the specified pattern |

{.style-list}

### String matching pattern -custom pattern display

| - | - |
| --- | --- |
| maskedPattern | pattern with specified display name |
| namedPattern | Specify a named pattern |

### String matching pattern -regular expression

| - | - |
| --- | --- |
| regexp | match regular expression (case sensitive) |
| regexpi | Match regular expressions (case insensitive) |
| regexprep | Replace text using regular expressions |
| regexptranslate | Convert text to regular expressions |
| regexpPattern | Match the pattern of the specified regular expression |

### String matching pattern -join and split

| - | - |
| --- | --- |
| join | Merge strings |
| plus | Add numbers, append strings |
| split | Split string at delimiter |
| splitlines | Split a string at newlines |
| strjoin | join the strings in the array |
| strsplit | Splits a string or character vector at the specified delimiter |
| strtok | Selected string part |
| extract | Extract a substring from a string |
| extractAfter | Extract the substring after the specified position |
| extractBefore | Extract the substring before the specified position |
| extractBetween | Extract the substring between the starting point and the ending point |

### String editing

| - | - |
| --- | --- |
| erase | Delete a substring in a string |
| eraseBetween | Delete the substring between the start and end |
| extract | Extract a substring from a string |
| extractAfter | Extract the substring after the specified position |
| extractBefore | Extract the substring before the specified position |
| extractBetween | Extract the substring between the starting point and the ending point |
| insertAfter | Insert a string after the specified substring |
| insertBefore | Insert a string before the specified substring |
| pad | Add leading or trailing characters to a string |
| strip | Remove leading and trailing characters in a string |
| lower | convert string to lowercase |
| upper | convert string to uppercase |
| reverse | Reverse the order of characters in a string |
| deblank | Remove trailing blanks at the end of a string |
| strtrim | Remove leading and trailing blanks from a string |
| strjust | align string |

### String comparison

| - | - |
| --- | --- |
| matches | Determine if a pattern matches a string |
| strcmp | Compare strings |
| strcmpi | Compare strings (case insensitive) |
| strncmp | compares the first `n` characters of a string (case sensitive) |
| strncmpi | Compare the first `n` characters of a string (case insensitive ) |

### Basic Arithmetic

#### Addition

- +Add numbers, append strings
- sumsum of array elements
- cumsumcumulative sum
- movsummoving sum

{.cols-2 .marker-none}

#### Subtraction

- -subtraction
- diffdifference and approximate derivative

{.cols-2 .marker-none}

#### Multiplication

| - | - |
| --- | --- |
| .* | Multiplication |
| * | Matrix multiplication |
| prod | product of array elements |
| cumprod | cumulative product |
| pagemtimes | Matrix multiplication by page |
| tensorprod | Tensor products between two tensors |

#### Division

| - | - |
| --- | --- |
| ./ | Array right division |
| .\ | Array left division |
| / | Solve the system of linear equations xA = B about x |
| \ | Solve the system of linear equations Ax = B with respect to x |

#### Power

- .^Element-wise exponentiation
- ^matrix power

{.cols-2 .marker-none}

#### Transpose

| - | - |
| --- | --- |
| .' | Transpose a vector or matrix |
| ' | complex conjugate transpose |
| pagetranspose | Transpose by page |
| pagectranspose | Complex conjugate transpose by page |

#### Array notation

- uminusunary subtraction
- uplusunary addition

{.cols-2 .marker-none}

### Modular division and rounding

| - | - |
| --- | --- |
| mod | Remainder after division (modulo operation) |
| rem | Remainder after division |
| idivide | Divisibility with rounding options |
| ceil | round towards positive infinity |
| fix | round towards zero |
| floor | round towards negative infinity |
| round | round to the nearest decimal or integer |

### Custom Binary Functions

| - | - |
| --- | --- |
| bsxfun | Apply element-wise operations on two arrays (with implicit expansion enabled) |

### Relational operations

value comparison

| - | - |
| --- | --- |
| == | Determine equality |
| >= | Determine greater than or equal to |
| > | Determine greater than |
| <= | Determine less than or equal to |
| < | Determine less than |
| ~= | Determine Inequality |
| isequal | Determine array equality |
| isequaln | Test array equality, treat `NaN` values as equal |

### Logical (Boolean) operations

true or false condition

| - | - |
| --- | --- |
| Short-circuit &&, \|\| | Logical operators with short-circuit function |
| & | Computational logic `AND` |
| ~ | Computational logic `NOT` |
| \| | Calculation logic `OR` |
| xor | Compute logical exclusive `OR` |
| all | Determine whether all array elements are non-zero or `true` |
| any | Determine if any array elements are non-zero |
| false | logical `0` (false) |
| find | Find the index and value of non-zero elements |
| islogical | Determine whether the input is a logical array |
| logical | Convert numeric values to logical values |
| true | Logical value `1` (true) |

### Set operation

union, intersection, set relationship

| - | - |
| --- | --- |
| intersect | Set the intersection of two arrays |
| ismember | Determine whether an array element is a set array member |
| setdiff | Set the difference between two arrays |
| setxor | Set XOR of two arrays |
| union | Set the union of two arrays |
| unique | Unique value in an array |
| ismembertol | set membership within tolerance |
| uniquetol | unique values within tolerance |
| join | Merge two tables or timetables row by row using a key variable |
| innerjoin | Inner join between two tables or timetables |
| outerjoin | Outer join between two tables or timetables |

### Bitwise operations

set, offset, or compare specific bitfields

| - | - |
| --- | --- |
| bitand | Bitwise `AND` |
| bitor | Bitwise `OR` |
| bitxor | Bitwise `XOR` |
| bitcmp | Bitwise complement |
| bitget | Get the bit at the specified position |
| bitset | Set the bit at the specified position |
| bitshift | Shift bits by specified number of bits |
| swapbytes | swap byte order |

## Data import and export

### text file -read and write table or timetable

#### Basic import and export

| - | - |
| --- | --- |
| readtable | Create a table based on a file |
| writetable | write table to file |
| readtimetable | Create a timetable based on a file |
| writetimetable | Write timetable to file |

#### Define import rules

| - | - |
| --- | --- |
| detectImportOptions | Generate import options based on file content |
| delimitedTextImportOptions | Import options object for delimited text |
| fixedWidthImportOptions | Import options object for fixed-width text files |
| xmlImportOptions | Import options object for XML file |
| htmlImportOptions | Import options object for HTML files |
| wordDocumentImportOptions | `Microsoft Word` file import options object |
| getvaropts | Get variable import options |
| setvaropts | Set variable import options |
| setvartype | Set variable data type |
| preview | Preview eight lines of data in the file with import options |

{.style-list}

### Text files -read and write matrices and arrays

| - | - |
| --- | --- |
| readmatrix | Read a matrix from a file |
| writematrix | Write matrix to file |
| readcell | Read a cell array from a file |
| writecell | Write a cell array to a file |
| readvars | Read variables from a file |
| textscan | Read formatted data from a text file or string |
| type | Display file content |
| fileread | Read file content in text format |
| readlines | Read lines of a file as an array of strings |
| writelines | Write text to file |

### Spreadsheet -Read and Write Table or Timetable

Basic import and export

| - | - |
| --- | --- |
| readtable | Create a table from a file |
| writetable | write table to file |
| readtimetable | Create a timetable from a file |
| writetimetable | Write timetable to file |
| sheetnames | Get sheetnames from a spreadsheet file |

{.style-list}

Define import rules

| - | - |
| --- | --- |
| detectImportOptions | Generate import options based on file content |
| spreadsheetImportOptions | Spreadsheet import options object |
| getvaropts | Get variable import options |
| setvaropts | Set variable import options |
| setvartype | Set variable data type |
| preview | Preview eight rows of data in a file with import options |

{.style-list}

### Spreadsheet -Reading and writing matrices and arrays

| - | - |
| --- | --- |
| readmatrix | Read a matrix from a file |
| writematrix | Write matrix to file |
| readcell | Read a cell array from a file |
| writecell | Write a cell array to a file |
| readvars | Read variables from a file |
| importdata | Load data from a file |

### images

| - | - |
| --- | --- |
| imfinfo | Information about graphics files |
| imread | Reads an image from a graphics file |
| imwrite | Writes an image to a graphics file |
| Tiff | MATLAB entry for LibTIFF library routines |

### Read or write a NetCDF file

| - | - |
| --- | --- |
| nccreate | Create variables in a NetCDF file |
| ncdisp | Displays NetCDF data source content in the command line window |
| ncinfo | Returns information about a NetCDF data source |
| ncread | Read variable data from a NetCDF data source |
| ncreadatt | Read attribute values in a NetCDF data source |
| ncwrite | Write data to a NetCDF file |
| ncwriteatt | Write attributes to a NetCDF file |
| ncwriteschema | Adds a NetCDF schema definition to a NetCDF file |

### NetCDF library package -library functions

| - | - |
| --- | --- |
| netcdf.getChunkCache | Retrieves the chunk cache settings for the NetCDF library |
| netcdf.inqLibVers | Returns NetCDF library version information |
| netcdf.setChunkCache | Sets the default chunk cache settings for the NetCDF library |
| netcdf.setDefaultFormat | Change the default netCDF file format |

{.style-list}

### NetCDF library package -file operations

| - | - |
| --- | --- |
| netcdf.abort | restores the most recent netCDF file definition |
| netcdf.close | Closes a netCDF file |
| netcdf.create | Create a new NetCDF dataset |
| netcdf.endDef | End netCDF file definition mode |
| netcdf.inq | returns information about a netCDF file |
| netcdf.inqFormat | Determines the format of a NetCDF file |
| netcdf.inqGrps | Retrieves an array of subgroup IDs |
| netcdf.inqUnlimDims | Retrieves a list of infinite dimensions in a group |
| netcdf.open | Open NetCDF data source |
| netcdf.reDef | puts an open netCDF file into definition mode |
| netcdf.setFill | Set netCDF fill mode |
| netcdf.sync | Synchronize netCDF files to disk |

### NetCDF Library Package -Dimensions

| - | - |
| --- | --- |
| netcdf.defdim | Create netCDF dimensions |
| netcdf.inqDim | Returns netCDF dimension names and lengths |
| netcdf.inqDimID | Returns the dimension ID |
| netcdf.renameDim | Change netCDF dimension names |

### NetCDF library package -group

| - | - |
| --- | --- |
| netcdf.defGrp | Create groups in a NetCDF file |
| netcdf.inqDimIDs | Retrieves a list of dimension identifiers in a group |
| netcdf.inqGrpName | Retrieve group name |
| netcdf.inqGrpNameFull | the full pathname of the group |
| netcdf.inqGrpParent | Retrieves the ID of the parent group. |
| netcdf.inqNcid | Returns the ID of a named group |
| netcdf.inqVarIDs | IDs of all variables in the group |

### NetCDF library package -variable

| - | - |
| --- | --- |
| netcdf.defVarFill | Defines the fill parameter for a NetCDF variable |
| netcdf.defVar | Create a NetCDF variable |
| netcdf.defVarChunking | Defines chunking behavior for NetCDF variables |
| netcdf.defVarDeflate | Defines compression parameters for NetCDF variables |
| netcdf.defVarFletcher32 | Defines validation parameters for NetCDF variables |
| netcdf.getVar | Read data in a NetCDF variable |
| netcdf.inqVar | Information about variables |
| netcdf.inqVarChunking | Determines chunking settings for NetCDF variables |
| netcdf.inqVarDeflate | Determines compression settings for NetCDF variables |
| netcdf.inqVarFill | Determines the fill parameter value for a NetCDF variable |
| netcdf.inqVarFletcher32 | About Fletcher32 checksum settings for NetCDF variables |
| netcdf.inqVarID | Returns the ID associated with the variable name |
| netcdf.putVar | Writes data to a netCDF variable |
| netcdf.renameVar | Change netCDF variable name |

{.style-list}

### NetCDF library package -properties

| - | - |
| --- | --- |
| netcdf.copyAtt | Copy an attribute to a new location |
| netcdf.delAtt | Remove netCDF attribute |
| netcdf.getAtt | Returns the NetCDF attribute |
| netcdf.inqAtt | Returns information about netCDF attributes |
| netcdf.inqAttID | Returns the ID of a netCDF attribute |
| netcdf.inqAttName | Returns the netCDF attribute name |
| netcdf.putAtt | Write netCDF attributes |
| netcdf.renameAtt | Change Attribute Name |

### NetCDF library package -user-defined types

| :- | :- |
| --- | --- |
| netcdf.defVlen | Define user-defined variable length array type (NC_VLEN) |
| netcdf.inqUserType | Return information about user-defined type |
| netcdf.inqVlen | Return information about user-defined `NC_VLEN` type |

{.style-list}

### NetCDF library package -Utilities

| - | - |
| --- | --- |
| netcdf.getConstant | returns the value of the named constant |
| netcdf.getConstantNames | returns a list of constants known to the netCDF library |

{.style-list}

### Read or write HDF5 files

| - | - |
| --- | --- |
| h5create | Create HDF5 dataset |
| h5disp | Display the content of HDF5 files |
| h5info | Information about HDF5 files |
| h5read | Read data from HDF5 dataset |
| h5readatt | Read attributes from HDF5 files |
| h5write | Write HDF5 dataset |
| h5writeatt | Write HDF5 attributes |

### HDF5 library package

| - | - |
| --- | --- |
| Library (H5) | General-purpose functions for use with entire HDF5 library |
| Attribute (H5A) | Metadata associated with datasets or groups |
| Dataset (H5D) | Multidimensional arrays of data elements and supporting metadata |
| Dimension Scale (H5DS) | Dimension scale associated with dataset dimensions |
| Error (H5E) | Error handling |
| File (H5F) | HDF5 file access |
| Group (H5G) | Organization of objects in file |
| Identifier (H5I) | HDF5 object identifiers |
| Link (H5L) | Links in HDF5 file |
| MATLAB (H5ML) | `MATLAB` utility functions not part of the HDF5 C library |
| Object (H5O) | Objects in file |
| Property (H5P) | Object property lists |
| Reference (H5R) | HDF5 references |
| Dataspace (H5S) | Dimensionality of dataset |
| Datatype (H5T) | Datatype of elements in a dataset |

{.style-list}

### HDF4 Files -Advanced Functions

| - | - |
| --- | --- |
| hdfinfo | Information about HDF4 or HDF-EOS files |
| hdfread | Read data from HDF4 or HDF-EOS files |
| imread | Read an image from a graphics file |
| imwrite | Write image to graphics file |

### Low-level functions -package

| - | - |
| --- | --- |
| matlab.io.hdf4.sd | Interact directly with the HDF4 multi-file scientific dataset (SD) interface |
| matlab.io.hdfeos.gd | Low-level access to HDF-EOS grid data |
| matlab.io.hdfeos.sw | Low-level access to HDF-EOS segmented files |

#### Low Level Functions -Functions

| - | - |
| --- | --- |
| hdfan | The entry of HDF multi-file annotation (AN) interface |
| hdfhx | The entry of HDF external data (HX) interface |
| hdfh | The entry of HDF H interface |
| hdfhd | The entry of HDF HD interface |
| hdfhe | The entry of HDF HE interface |
| hdfml | Utilities for use with `MATLAB` HDF entry functions |
| hdfpt | Interface of HDF-EOS point object |
| hdfv | The entry of HDF Vgroup (V) interface |
| hdfvf | The entry of VF function in HDF Vdata interface |
| hdfvh | The entry of VH function in HDF Vdata interface |
| hdfvs | The entry of VS function in HDF Vdata interface |
| hdfdf24 | HDF 24-bit raster image (DF24) interface entry |
| hdfdfr8 | HDF 8-bit raster image (DFR8) interface entry |

### FITS file -function

| - | - |
| --- | --- |
| fitsdisp | Display FITS metadata |
| fitsinfo | Information about FITS files |
| fitsread | Read data in FITS files |
| fitswrite | Write image to FITS file |

### FITS files -file access

| - | - |
| --- | --- |
| createFile | Create FITS file |
| openFile | Open FITS file |
| openDiskFile | Open FITS file |
| closeFile | Close FITS file |
| deleteFile | Delete FITS file |
| fileName | The name of the FITS file |
| fileMode | I/O mode for FITS files |

### FITS files -image processing

| - | - |
| --- | --- |
| createImg | Create FITS image |
| getImgSize | image size |
| getImgType | The data type of the image |
| insertImg | Insert a FITS image after the current image |
| readImg | read image data |
| setBscale | Reset image scaling |
| writeImg | write FITS image |

### FITS file -keyword

| - | - |
| --- | --- |
| readCard | Header record of keywords |
| readKey | Keyword |
| readKeyCmplx | A keyword in the form of a complex scalar value |
| readKeyDbl | Keyword in the form of double precision value |
| readKeyLongLong | Keyword in the form of `int64` |
| readKeyLongStr | long string value |
| readKeyUnit | The physical unit string in the key |
| readRecord | Header record specified by number |
| writeComment | Write or append COMMENT keyword to CHU |
| writeDate | Write DATE keyword to CHU |
| writeKey | Update or add new keywords to the current HDU |
| writeKeyUnit | write physical unit string |
| writeHistory | Write or append HISTORY keyword to CHU |
| deleteKey | Delete key by name |
| deleteRecord | Delete keywords by record number |
| getHdrSpace | The number of keywords in the header |

### FITS files -Header Data Unit (HDU) access

| - | - |
| --- | --- |
| copyHDU | Copy current HDU from one file to another |
| getHDUnum | The number of the current HDU in the FITS file |
| getHDUtype | current HDU type |
| getNumHDUs | Total number of HDUs in FITS file |
| movAbsHDU | Move to Absolute HDU Numbering |
| movNamHDU | Move to the first HDU containing a specific type and keyword value |
| movRelHDU | Move relative amount of HDU from current HDU |
| writeChecksum | Calculate and write the checksum of the current HDU |
| deleteHDU | Delete the current HDU in the FITS file |

### FITS files -image compression

| - | - |
| --- | --- |
| imgCompress | Compress HDU from one file to another |
| isCompressedImg | Determine whether the current image is compressed |
| setCompressionType | Set image compression type |
| setHCompScale | Set the scaling parameters of the HCOMPRESS algorithm |
| setHCompSmooth | Sets smoothing for images compressed with HCOMPRESS |
| setTileDim | Set tile dimensions |

### FITS file -ASCII table and binary table

| - | - |
| --- | --- |
| createTbl | Create a new ASCII or binary table extension |
| insertCol | Insert a column into a table |
| insertRows | Insert rows into the table |
| insertATbl | Insert an ASCII table after the current HDU |
| insertBTbl | Insert a binary table behind the current HDU |
| deleteCol | Delete a column from a table |
| deleteRows | Delete rows from the table |
| getAColParms | ASCII table information |
| getBColParms | binary table information |
| getColName | table column name |
| getColType | Data type, repeat value, width of scaled column |
| getEqColType | column data type, repeated value, width |
| getNumCols | The number of columns in the table |
| getNumRows | the number of rows in the table |
| readATblHdr | Read the header information from the current ASCII table |
| readBTblHdr | Read the header information from the current binary table |
| readCol | Reads rows of ASCII or binary table columns |
| setTscale | reset image scaling |
| writeCol | Write elements to an ASCII or binary table column |

### FITS files -Utilities

| - | - |
| --- | --- |
| getConstantValue | specify the constant value |
| getVersion | The revision number of the CFITSIO library |
| getOpenFiles | list of opened FITS files |

### Stripe interleaved file

| - | - |
| --- | --- |
| multibandread | Read a striped interleaved file from a binary file |
| multibandwrite | Write strip interleaved data to a file |

### Common Data Format (CDF)

| - | - |
| --- | --- |
| cdfinfo | Information on Common Data Format (CDF) files |
| cdfread | Read data in Common Data Format (CDF) files |
| cdfepoch | Converts a date literal or date sequence value to a date in CDF format |
| todatenum | Convert CDF epoch objects to `MATLAB` date serial values |

#### Bag

| - | - |
| --- | --- |
| cdflib | Direct interaction with CDF library |

### Read video data

| - | - |
| --- | --- |
| VideoReader | Create an object to read a video file |
| read | Read one or more video frames |
| readFrame | Read the next video frame |
| hasFrame | Determine whether there are video frames available for reading |
| getFileFormats | File formats supported by `VideoReader` |
| mmfileinfo | Information about multimedia files |

### Write video data

| - | - |
| --- | --- |
| VideoWriter | Create an object to write a video file |
| open | Open a file to write video data |
| writeVideo | Write video data to a file |
| close | close the file after writing video data |
| getProfiles | Description files and file formats supported by `VideoWriter` |

### Read or write audio

| - | - |
| --- | --- |
| audioread | Read audio files |
| audiowrite | Write audio files |
| lin2mu | Convert linear audio signal to mu-law |
| mu2lin | Convert mu-law audio signal to linear format |
| audioinfo | Information about audio files |

### Play audio

| - | - |
| --- | --- |
| audioplayer | Object for playing audio |
| isplaying | Determine whether playback is in progress |
| pause | Pause playback or recording |
| play | Play audio from `audioplayer` object |
| playblocking | Play audio in `audioplayer` object, keep control until playback is complete |
| resume | Resume playback or recording from the paused state |
| stop | Stop playing or recording |

### Record audio

| - | - |
| --- | --- |
| audiorecorder | object for recording audio |
| getaudiodata | Store the recorded audio signal in a numeric array |
| getplayer | Create an associated `audioplayer` object |
| isrecording | Determine if recording is in progress |
| record | Record audio into `audiorecorder` object |
| recordblocking | Record audio into an `audiorecorder` object, keep control until recording is complete |

### Play sound

| - | - |
| --- | --- |
| audiodevinfo | Information about audio devices |
| audiodevreset | Refresh the list of available audio devices |
| sound | Convert signal data matrix to sound |
| soundsc | Scale data and play it as sound |
| beep | generate operating system beep |

### Reading and writing XML documents

| - | - |
| --- | --- |
| matlab.io.xml.dom.DOMWriter | Write serialized XML documents Injector |
| matlab.io.xml.dom.EntityResolver | Abstract base class of entity resolver |
| matlab.io.xml.dom.FileWriter | Writer for creating text files |
| matlab.io.xml.dom.Locator | The location of the element in the XML file |
| matlab.io.xml.dom.Parser | XML markup parser |
| matlab.io.xml.dom.ParserConfiguration | XML parser options |
| matlab.io.xml.dom.ParseError | Specified XML tag parsing error |
| matlab.io.xml.dom.ParseErrorHandler | Abstract base class for parse error handlers |
| matlab.io.xml.dom.ParseErrorLocator | Specifies location of parse error |
| matlab.io.xml.dom.ParseErrorSeverity | Indicates the severity of XML tag parsing errors enum class |
| matlab.io.xml.dom.ResourceIdentifier | XML resource identifier |
| matlab.io.xml.dom.ResourceIdentifierType | XML resource identifier type |
| matlab.io.xml.dom.WriterConfiguration | XML DOM Writer Options |

{.style-list-arrow}

### W3C DOM

| - | - |
| --- | --- |
| matlab.io.xml.dom.Attr | Attributes of XML elements |
| matlab.io.xml.dom.CDATASection | CDATA section |
| matlab.io.xml.dom.Comment | Comments in XML documents |
| matlab.io.xml.dom.Document | XML document |
| matlab.io.xml.dom.DocumentFragment | document node group |
| matlab.io.xml.dom.DocumentType | document type |
| matlab.io.xml.dom.Element | element of XML document |
| matlab.io.xml.dom.Entity | Entity defined by document type |
| matlab.io.xml.dom.NamedNodeMap | A set of document nodes with names |
| matlab.io.xml.dom.NodeList | document node list |
| matlab.io.xml.dom.Notation | Notation in document type definition |
| matlab.io.xml.dom.ProcessingInstruction | XML processing instruction |
| matlab.io.xml.dom.Text | Text in an XML document |
| matlab.io.xml.dom.TypeInfo | schema type information |

{.style-list-arrow}

### XML Transformation

| - | - |
| --- | --- |
| matlab.io.xml.transform.CompiledStylesheet | Compiled stylesheet |
| matlab.io.xml.transform.ResultDocument | Store the transformation result as a document |
| matlab.io.xml.transform.ResultString | Store the transformation result as a string |
| matlab.io.xml.transform.ResultFile | Store the transformation result as a file |
| matlab.io.xml.transform.SourceDocument | XML source document for transformation |
| matlab.io.xml.transform.SourceFile | XML source file for transformation |
| matlab.io.xml.transform.SourceString | XML source string for transformation string |
| matlab.io.xml.transform.StylesheetSourceDocument | Stylesheet source for transformation document |
| matlab.io.xml.transform.StylesheetSourceFile | Stylesheet source for transformation document |
| matlab.io.xml.transform.StylesheetSourceString | XSL source string for transformation string |
| matlab.io.xml.transform.Tracer | Trace execution of stylesheet |

{.style-list-arrow}

### XPath query

| - | - |
| --- | --- |
| matlab.io.xml.xpath.CompiledExpression | Compiled XPath expression |
| matlab.io.xml.xpath.EvalResultType | The result type of XPath expression calculation |
| matlab.io.xml.xpath.Evaluator | XPath expression evaluator |
| matlab.io.xml.xpath.PrefixResolver | For namespace prefix resolver Abstract base class for |

{.style-list-arrow}

### JSON format

| - | - |
| --- | --- |
| jsondecode | Decode text in JSON format |
| jsonencode | Create JSON-formatted text from structured `MATLAB` data |

### Workspace variables and MAT-file

| - | - |
| --- | --- |
| load | Load file variables into the workspace |
| save | Save workspace variables to a file |
| matfile | Access and change variables in a MAT-file without loading the file into memory |
| disp | Display the value of the variable |
| formattedDisplayText | Capture display output as a string |
| who | List variables in the workspace |
| whos | List variables in the workspace with their size and type |
| clear | Delete items from the workspace and release system memory |
| clearvars | Clear variables in memory |
| openvar | Open a workspace variable in the variable editor or other graphical editing tools |
| Workspace Browser | Open the Workspace Browser to manage the workspace |

### Low-level file I/O

| - | - |
| --- | --- |
| fclose | close one or all open files |
| feof | Detect the end of the file |
| ferror | File I/O error message |
| fgetl | Read lines in a file and remove line breaks |
| fgets | Read lines in a file and keep newlines |
| fileread | Read file content in text format |
| fopen | Open a file or get information about opening a file |
| fprintf | Write data to a text file |
| fread | Read data in binary files |
| frewind | Move the file position indicator to the beginning of the opened file |
| fscanf | Read the data in the text file |
| fseek | Move to the specified position in the file |
| ftell | current location |
| fwrite | Write data to a binary file |

### Serial and USB Communication -Connection and Configuration

| - | - |
| --- | --- |
| serialportlist | List of serial ports connected to your system |
| serialport | Connect to a serial port |
| configureTerminator | Set the terminator for ASCII string communication with the serial port |
| configureCallback | Set callback function and trigger conditions for communication with serial port devices |

### Serial and USB communication -read and write

| - | - |
| --- | --- |
| read | Read data from the serial port |
| readline | Read ASCII string data line from serial port |
| write | write data to serial port |
| writeline | Write ASCII data line to serial port |

### Serial and USB communication -control pins and memory

| - | - |
| --- | --- |
| flush | Clear the serial port device buffer |
| getpinstatus | Get the serial port status |
| setRTS | Set the serial port RTS pin |
| setDTR | Set the serial DTR pin |

### TCP/IP communication -connection and configuration

| - | - |
| --- | --- |
| tcpclient | Create a TCP/IP client connection to a TCP/IP server |
| echotcpip | Start or stop the TCP/IP echo server |
| configureTerminator | Set terminator for ASCII string communication with remote host via TCP/IP |
| configureCallback | Set callback function and trigger condition for communication with remote host via TCP/IP |

{.style-list}

### TCP/IP communication -read and write

| - | - |
| --- | --- |
| read | Read data on a remote host via TCP/IP |
| readline | Read ASCII string data line from remote host via TCP/IP |
| write | Write data to a remote host via TCP/IP |
| writeline | Write ASCII data line to remote host via TCP/IP |
| flush | Flush buffers for communication with remote hosts via TCP/IP |

{.style-list}

### Bluetooth communication -connection and configuration

| - | - |
| --- | --- |
| bluetoothlist | Scan for nearby `Bluetooth` classic devices |
| bluetooth | Connect to `Bluetooth` classic device |
| configureTerminator | Set terminator for ASCII string communication with `Bluetooth` device |
| configureCallback | Set callback function and trigger condition for communication with `Bluetooth` device |

{.style-list}

### Bluetooth communication -read and write

| - | - |
| --- | --- |
| read | Read data from a `Bluetooth` device |
| readline | Read ASCII string data line from `Bluetooth` device |
| write | write data to `Bluetooth` device |
| writeline | Write ASCII data line to `Bluetooth` device |
| flush | Clear `Bluetooth` device buffer |

{.style-list}

### Bluetooth Low Energy Communication

| - | - |
| --- | --- |
| blelist | Scan for nearby low energy `Bluetooth` peripherals |
| ble | Connect to low energy `Bluetooth` peripherals |
| characteristic | Access to characteristics of `Bluetooth` low energy peripherals |
| descriptor | Access descriptors on `Bluetooth` low energy peripherals |
| read | Read characteristic or descriptor data on a `Bluetooth` low energy peripheral device |
| write | Write data to a characteristic or descriptor of a `Bluetooth` low energy peripheral device |
| subscribe | Subscribe to characteristic notifications or instructions |
| unsubscribe | Unsubscribe characteristic notifications and instructions |

{.style-list}

### Web Services

| - | - |
| --- | --- |
| webread | Read content from RESTful web services |
| webwrite | Write data to RESTful web service |
| websave | Save content in RESTful web service to file |
| weboptions | Specify parameters for RESTful web services |
| web | Open a webpage or file in a browser |
| sendmail | Send email to address list |

### FTP file operations

| - | - |
| --- | --- |
| ftp | Connect to an FTP server to access its files |
| sftp | Connection to SFTP server to access its files |
| ascii | Set FTP transfer mode to ASCII |
| binary | Set FTP transfer mode to binary |
| cd | Change or view the current folder on an SFTP or FTP server |
| close | Close the connection to the SFTP or FTP server |
| delete | Delete files on SFTP or FTP server |
| dir | List folder contents on SFTP or FTP server |
| mget | Download files from SFTP or FTP server |
| mkdir | Create a new folder on an SFTP or FTP server |
| mput | Upload files or folders to SFTP or FTP server |
| rename | Rename a file on an SFTP or FTP server |
| rmdir | Delete a folder on an SFTP or FTP server |

### Internet of Things (IoT) Data

| - | - |
| --- | --- |
| thingSpeakRead | Read data stored in `ThingSpeak` channel |
| thingSpeakWrite | write data to `ThingSpeak` channel |

