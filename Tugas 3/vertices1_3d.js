// radius = 3
// lingkaran dimisalkan dengan segi-8

vertices1_3d = [
    // Bawah badan
    -1.50000, -1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 24
    -1.50000, -1.00000,  1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 25
    -0.79728, -1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 26
    -0.50000, -1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 27
    -0.79728, -1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 28
    -1.50000, -1.00000, -1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 29
    -2.20711, -1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 30
    -2.50000, -1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 31
    -2.20711, -1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 32

    // Atas badan
    -1.50000,  1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 33
    -1.50000,  1.00000,  1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 34
    -0.79728,  1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 35
    -0.50000,  1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 36
    -0.79728,  1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 37
    -1.50000,  1.00000, -1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 38
    -2.20711,  1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 39
    -2.50000,  1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 40
    -2.20711,  1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 41

    // Bawah tutup
    -1.50000,  1.00000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 42
    -1.50000,  1.00000,  1.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 43
    -0.79728,  1.00000,  0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 44
    -0.50000,  1.00000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 45
    -0.79728,  1.00000, -0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 46
    -1.50000,  1.00000, -1.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 47
    -2.20711,  1.00000, -0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 48
    -2.50000,  1.00000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 49
    -2.20711,  1.00000,  0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 50

    // Atas tutup
    -1.50000,  1.15000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 51
    -1.50000,  1.15000,  1.10000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 52
    -0.75838,  1.15000,  0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 53
    -0.40000,  1.15000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 54
    -0.75838,  1.15000, -0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 55
    -1.50000,  1.15000, -1.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 56
    -2.24162,  1.15000, -0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 57
    -2.60000,  1.15000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 58
    -2.24162,  1.15000,  0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 59
];

indices_v1 = [
    // Selimut badan
    25, 26, 34,
    34, 35, 26,
    26, 27, 35,
    35, 36, 27,
    27, 28, 36,
    36, 37, 28,
    28, 29, 37,
    37, 38, 29,
    29, 30, 38,
    38, 39, 30,
    30, 31, 39,
    39, 40, 31,
    31, 32, 40,
    40, 41, 32,
    32, 25, 41,
    41, 34, 25,

    // Selimut tutup
    43, 44, 52,
    52, 53, 44,
    44, 45, 53,
    53, 54, 45,
    45, 46, 54,
    54, 55, 46,
    46, 47, 55,
    55, 56, 47,
    47, 48, 56,
    56, 57, 48,
    48, 49, 57,
    57, 58, 49,
    49, 50, 58,
    58, 59, 50,
    50, 43, 59,
    59, 52, 43,
];