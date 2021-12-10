// radius = 3
// lingkaran dimisalkan dengan segi-8

vertices2_3d = [
    // Bawah badan
     1.50000, -1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 60
     1.50000, -1.00000,  1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 61
     0.79728, -1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 62
     0.50000, -1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 63
     0.79728, -1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 64
     1.50000, -1.00000, -1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 65
     2.20711, -1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 66
     2.50000, -1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 67
     2.20711, -1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 68

    // Atas badan
     1.50000,  1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 69
     1.50000,  1.00000,  1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 70
     0.79728,  1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 71
     0.50000,  1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 72
     0.79728,  1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 73
     1.50000,  1.00000, -1.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 74
     2.20711,  1.00000, -0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 75
     2.50000,  1.00000,  0.00000,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 76
     2.20711,  1.00000,  0.70711,       0.800, 0.990, 0.985,    0, 0, -1, 10, // 77

    // Bawah tutup
     1.50000,  1.00000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 78
     1.50000,  1.00000,  1.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 79
     0.79728,  1.00000,  0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 80
     0.50000,  1.00000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 81
     0.79728,  1.00000, -0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 82
     1.50000,  1.00000, -1.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 83
     2.20711,  1.00000, -0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 84
     2.50000,  1.00000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 85
     2.20711,  1.00000,  0.70711,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 86

    // Atas tutup
     1.50000,  1.15000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 87
     1.50000,  1.15000,  1.10000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 88
     0.75838,  1.15000,  0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 89
     0.40000,  1.15000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 90
     0.75838,  1.15000, -0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 91
     1.50000,  1.15000, -1.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 92
     2.24162,  1.15000, -0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 93
     2.60000,  1.15000,  0.00000,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 94
     2.24162,  1.15000,  0.74162,       0.350, 0.880, 0.190,    0, 0, -1, 10, // 95
];

indices_v2 = [
    // Selimut badan
    61, 62, 70,
    70, 71, 62,
    62, 63, 71,
    71, 72, 63,
    63, 64, 72,
    72, 73, 64,
    64, 65, 73,
    73, 74, 65,
    65, 66, 74,
    74, 75, 66,
    66, 67, 75,
    75, 76, 67,
    67, 68, 76,
    76, 77, 68,
    68, 61, 77,
    77, 70, 61,

    // Selimut tutup
    79, 80, 88,
    88, 89, 80,
    80, 81, 89,
    89, 90, 81,
    81, 82, 90,
    90, 91, 82,
    82, 83, 91,
    91, 92, 83,
    83, 84, 92,
    92, 93, 85,
    85, 86, 93,
    93, 94, 85,
    85, 86, 94,
    94, 95, 86,
    86, 79, 95,
    95, 88, 79,
];