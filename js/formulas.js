// Formulas Database and Manager
class FormulasManager {
    constructor() {
        this.currentCategory = 'geometry';
        this.selectedFormula = null;
        
        this.formulas = {
            geometry: [
                {
                    id: 'circle_area',
                    name: 'Circle Area',
                    formula: 'A = πr²',
                    description: 'Area of a circle with radius r',
                    variables: { 'A': 'Area', 'r': 'Radius', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'The area of a circle can be derived by integration in polar coordinates or by considering the limit of regular polygons inscribed in the circle.',
                    history: 'The formula for the area of a circle was known to ancient civilizations. Archimedes (287-212 BC) proved this formula rigorously using the method of exhaustion.',
                    applications: ['Engineering design', 'Architecture', 'Physics calculations', 'Computer graphics'],
                    example: 'For a circle with radius 5 units: A = π × 5² = 25π ≈ 78.54 square units',
                    relatedFormulas: ['circle_circumference', 'sphere_volume']
                },
                {
                    id: 'circle_circumference',
                    name: 'Circle Circumference',
                    formula: 'C = 2πr',
                    description: 'Circumference (perimeter) of a circle with radius r',
                    variables: { 'C': 'Circumference', 'r': 'Radius', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'The circumference is the limit of the perimeter of regular polygons as the number of sides approaches infinity.',
                    history: 'Ancient Babylonians approximated π as 3, while Archimedes calculated it to be between 3.1408 and 3.1429.',
                    applications: ['Wheel manufacturing', 'Circular motion calculations', 'Gear design'],
                    example: 'For a circle with radius 3 units: C = 2π × 3 = 6π ≈ 18.85 units',
                    relatedFormulas: ['circle_area', 'arc_length']
                },
                {
                    id: 'rectangle_area',
                    name: 'Rectangle Area',
                    formula: 'A = l × w',
                    description: 'Area of a rectangle with length l and width w',
                    variables: { 'A': 'Area', 'l': 'Length', 'w': 'Width' },
                    derivation: 'The area is derived from the definition of area as the number of unit squares that fit inside the rectangle.',
                    history: 'Rectangle area calculations date back to ancient Egypt and Babylon, used for land measurement and taxation.',
                    applications: ['Construction', 'Land surveying', 'Floor planning', 'Material estimation'],
                    example: 'For a rectangle 5 × 3 units: A = 5 × 3 = 15 square units',
                    relatedFormulas: ['rectangle_perimeter', 'triangle_area']
                },
                {
                    id: 'triangle_area',
                    name: 'Triangle Area',
                    formula: 'A = ½bh',
                    description: 'Area of a triangle with base b and height h',
                    variables: { 'A': 'Area', 'b': 'Base', 'h': 'Height' },
                    derivation: 'A triangle is half of a parallelogram with the same base and height.',
                    history: 'Triangle area formulas were used by ancient surveyors and mathematicians, including those in ancient Egypt and Greece.',
                    applications: ['Structural engineering', 'Computer graphics', 'Navigation', 'Architecture'],
                    example: 'For a triangle with base 6 and height 4: A = ½ × 6 × 4 = 12 square units',
                    relatedFormulas: ['herons_formula', 'triangle_perimeter']
                },
                {
                    id: 'sphere_volume',
                    name: 'Sphere Volume',
                    formula: 'V = (4/3)πr³',
                    description: 'Volume of a sphere with radius r',
                    variables: { 'V': 'Volume', 'r': 'Radius', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'Can be derived using calculus by rotating a semicircle around its diameter, or by integration in spherical coordinates.',
                    history: 'Archimedes derived this formula around 250 BC using geometric methods, considering it one of his greatest achievements.',
                    applications: ['Ball manufacturing', 'Planetary science', 'Bubble physics', 'Medical imaging'],
                    example: 'For a sphere with radius 3 units: V = (4/3)π × 3³ = 36π ≈ 113.1 cubic units',
                    relatedFormulas: ['sphere_surface_area', 'cylinder_volume']
                },
                {
                    id: 'sphere_surface_area',
                    name: 'Sphere Surface Area',
                    formula: 'A = 4πr²',
                    description: 'Surface area of a sphere with radius r',
                    variables: { 'A': 'Surface Area', 'r': 'Radius', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'Derived using calculus by integrating the circumference of circles over the surface of the sphere.',
                    history: 'Known to Archimedes in ancient Greece, this formula represents the area of the curved surface of a sphere.',
                    applications: ['Material calculation', 'Heat transfer', 'Packaging design', 'Astronomy'],
                    example: 'For a sphere with radius 5 units: A = 4π × 5² = 100π ≈ 314.16 square units',
                    relatedFormulas: ['sphere_volume', 'circle_area']
                },
                {
                    id: 'cylinder_volume',
                    name: 'Cylinder Volume',
                    formula: 'V = πr²h',
                    description: 'Volume of a cylinder with radius r and height h',
                    variables: { 'V': 'Volume', 'r': 'Radius', 'h': 'Height', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'Volume equals the area of the circular base times the height.',
                    history: 'Used by ancient civilizations for calculating storage capacity in cylindrical containers.',
                    applications: ['Tank design', 'Engine cylinders', 'Pipe calculations', 'Storage containers'],
                    example: 'For a cylinder with radius 3 and height 10: V = π × 3² × 10 = 90π ≈ 282.74 cubic units',
                    relatedFormulas: ['cylinder_surface_area', 'cone_volume']
                },
                {
                    id: 'cone_volume',
                    name: 'Cone Volume',
                    formula: 'V = (1/3)πr²h',
                    description: 'Volume of a cone with base radius r and height h',
                    variables: { 'V': 'Volume', 'r': 'Base Radius', 'h': 'Height', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'One-third of the volume of a cylinder with the same base and height.',
                    history: 'Geometric relationships known to ancient Egyptian and Greek mathematicians.',
                    applications: ['Ice cream cones', 'Traffic cones', 'Funnels', 'Pyramid calculations'],
                    example: 'For a cone with radius 4 and height 9: V = (1/3)π × 4² × 9 = 48π ≈ 150.8 cubic units',
                    relatedFormulas: ['cylinder_volume', 'pyramid_volume']
                },
                {
                    id: 'pyramid_volume',
                    name: 'Pyramid Volume',
                    formula: 'V = (1/3)Bh',
                    description: 'Volume of a pyramid with base area B and height h',
                    variables: { 'V': 'Volume', 'B': 'Base Area', 'h': 'Height' },
                    derivation: 'One-third of the volume of a prism with the same base area and height.',
                    history: 'Essential for ancient Egyptian pyramid construction and modern architecture.',
                    applications: ['Architecture', 'Structural engineering', 'Archaeological studies', 'Geometric design'],
                    example: 'For a pyramid with base area 25 and height 12: V = (1/3) × 25 × 12 = 100 cubic units',
                    relatedFormulas: ['cone_volume', 'prism_volume']
                },
                {
                    id: 'trapezoid_area',
                    name: 'Trapezoid Area',
                    formula: 'A = ½(b₁ + b₂)h',
                    description: 'Area of a trapezoid with parallel bases b₁, b₂ and height h',
                    variables: { 'A': 'Area', 'b₁': 'First base', 'b₂': 'Second base', 'h': 'Height' },
                    derivation: 'Average of the two parallel bases times the height.',
                    history: 'Used in ancient land surveying and construction for irregular quadrilateral areas.',
                    applications: ['Land surveying', 'Civil engineering', 'Architectural design', 'Area calculations'],
                    example: 'For a trapezoid with bases 6, 10 and height 4: A = ½(6+10) × 4 = 32 square units',
                    relatedFormulas: ['rectangle_area', 'triangle_area']
                },
                {
                    id: 'herons_formula',
                    name: 'Heron\'s Formula',
                    formula: 'A = √[s(s-a)(s-b)(s-c)]',
                    description: 'Area of a triangle given side lengths a, b, c where s = (a+b+c)/2',
                    variables: { 'A': 'Area', 'a,b,c': 'Side lengths', 's': 'Semi-perimeter' },
                    derivation: 'Derived using algebraic manipulation of the triangle area formula and the law of cosines.',
                    history: 'Named after Hero of Alexandria (1st century AD), though possibly known earlier to Archimedes.',
                    applications: ['Surveying', 'Navigation', 'Engineering', 'Computer graphics'],
                    example: 'For triangle with sides 3,4,5: s = 6, A = √[6×3×2×1] = √36 = 6 square units',
                    relatedFormulas: ['triangle_area', 'law_of_cosines']
                },
                {
                    id: 'pythagorean_theorem',
                    name: 'Pythagorean Theorem',
                    formula: 'a² + b² = c²',
                    description: 'For right triangles: sum of squares of legs equals square of hypotenuse',
                    variables: { 'a,b': 'Legs of right triangle', 'c': 'Hypotenuse' },
                    derivation: 'Can be proven geometrically using square areas or algebraically using similar triangles.',
                    history: 'Known to Babylonians around 1900-1600 BC, formalized by Pythagoras around 500 BC.',
                    applications: ['Construction', 'Navigation', 'Engineering', 'Computer graphics', 'Physics'],
                    example: 'For a right triangle with legs 3 and 4: c² = 3² + 4² = 9 + 16 = 25, so c = 5',
                    relatedFormulas: ['distance_formula', 'law_of_cosines']
                },
                {
                    id: 'ellipse_area',
                    name: 'Ellipse Area',
                    formula: 'A = πab',
                    description: 'Area of an ellipse with semi-major axis a and semi-minor axis b',
                    variables: { 'A': 'Area', 'a': 'Semi-major axis', 'b': 'Semi-minor axis', 'π': 'Pi (≈ 3.14159)' },
                    derivation: 'Derived using calculus integration or geometric transformation from a circle.',
                    history: 'Ellipses studied by ancient Greeks, with area formula developed during Renaissance mathematics.',
                    applications: ['Orbital mechanics', 'Optics', 'Architecture', 'Engineering design'],
                    example: 'For an ellipse with a = 5 and b = 3: A = π × 5 × 3 = 15π ≈ 47.12 square units',
                    relatedFormulas: ['circle_area', 'ellipse_circumference']
                },
                {
                    id: 'rhombus_area',
                    name: 'Rhombus Area',
                    formula: 'A = ½d₁d₂',
                    description: 'Area of a rhombus with diagonals d₁ and d₂',
                    variables: { 'A': 'Area', 'd₁': 'First diagonal', 'd₂': 'Second diagonal' },
                    derivation: 'Area equals half the product of the diagonals, which bisect each other at right angles.',
                    history: 'Geometric properties studied by ancient Greek mathematicians as part of quadrilateral geometry.',
                    applications: ['Tile design', 'Crystal structure', 'Art and design', 'Engineering'],
                    example: 'For a rhombus with diagonals 8 and 6: A = ½ × 8 × 6 = 24 square units',
                    relatedFormulas: ['parallelogram_area', 'kite_area']
                },
                {
                    id: 'regular_polygon_area',
                    name: 'Regular Polygon Area',
                    formula: 'A = ½nsr = ¼ns²cot(π/n)',
                    description: 'Area of regular polygon with n sides, side length s, apothem r',
                    variables: { 'A': 'Area', 'n': 'Number of sides', 's': 'Side length', 'r': 'Apothem' },
                    derivation: 'Sum of areas of n congruent triangles from center to vertices.',
                    history: 'Regular polygon properties studied extensively by ancient Greek geometers.',
                    applications: ['Architecture', 'Engineering', 'Art design', 'Crystal structures'],
                    example: 'For hexagon with side 4: A = ¼ × 6 × 16 × cot(30°) = 24√3 ≈ 41.57 square units',
                    relatedFormulas: ['triangle_area', 'circle_area']
                }
            ],
            algebra: [
                {
                    id: 'quadratic_formula',
                    name: 'Quadratic Formula',
                    formula: 'x = (-b ± √(b² - 4ac)) / 2a',
                    description: 'Solution to quadratic equations ax² + bx + c = 0',
                    variables: { 'x': 'Solution', 'a': 'Coefficient of x²', 'b': 'Coefficient of x', 'c': 'Constant term' },
                    derivation: 'Derived by completing the square on the general quadratic equation ax² + bx + c = 0.',
                    history: 'Ancient Babylonians solved quadratic equations around 2000 BC. The modern formula was developed during the Islamic Golden Age by Al-Khwarizmi (9th century).',
                    applications: ['Physics trajectories', 'Engineering optimization', 'Economic modeling', 'Computer algorithms'],
                    example: 'For x² - 5x + 6 = 0: x = (5 ± √(25-24))/2 = (5 ± 1)/2, so x = 3 or x = 2',
                    relatedFormulas: ['discriminant', 'vertex_form']
                },
                {
                    id: 'slope_formula',
                    name: 'Slope Formula',
                    formula: 'm = (y₂ - y₁) / (x₂ - x₁)',
                    description: 'Slope of a line passing through points (x₁, y₁) and (x₂, y₂)',
                    variables: { 'm': 'Slope', 'x₁,y₁': 'First point', 'x₂,y₂': 'Second point' },
                    derivation: 'Slope represents the rate of change in y with respect to x, derived from the definition of a derivative.',
                    history: 'The concept of slope was formalized by Pierre de Fermat in the 17th century as part of analytic geometry.',
                    applications: ['Road construction', 'Economic growth rates', 'Physics velocity', 'Statistical regression'],
                    example: 'For points (2,3) and (5,9): m = (9-3)/(5-2) = 6/3 = 2',
                    relatedFormulas: ['point_slope_form', 'distance_formula']
                },
                {
                    id: 'distance_formula',
                    name: 'Distance Formula',
                    formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
                    description: 'Distance between two points in a coordinate plane',
                    variables: { 'd': 'Distance', 'x₁,y₁': 'First point', 'x₂,y₂': 'Second point' },
                    derivation: 'Derived from the Pythagorean theorem by treating the distance as the hypotenuse of a right triangle.',
                    history: 'Based on Pythagorean theorem (6th century BC), formalized in coordinate geometry by René Descartes (17th century).',
                    applications: ['GPS navigation', 'Computer graphics', 'Physics', 'Game development'],
                    example: 'Distance between (1,2) and (4,6): d = √[(4-1)² + (6-2)²] = √[9+16] = √25 = 5',
                    relatedFormulas: ['pythagorean_theorem', 'midpoint_formula']
                },
                {
                    id: 'midpoint_formula',
                    name: 'Midpoint Formula',
                    formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)',
                    description: 'Midpoint of line segment between two points',
                    variables: { 'M': 'Midpoint', 'x₁,y₁': 'First point', 'x₂,y₂': 'Second point' },
                    derivation: 'Average of the x-coordinates and y-coordinates of the two endpoints.',
                    history: 'Basic coordinate geometry concept formalized with analytic geometry in the 17th century.',
                    applications: ['Computer graphics', 'Engineering design', 'Statistics', 'Navigation'],
                    example: 'Midpoint of (1,3) and (5,7): M = ((1+5)/2, (3+7)/2) = (3,5)',
                    relatedFormulas: ['distance_formula', 'section_formula']
                },
                {
                    id: 'point_slope_form',
                    name: 'Point-Slope Form',
                    formula: 'y - y₁ = m(x - x₁)',
                    description: 'Equation of line through point (x₁,y₁) with slope m',
                    variables: { 'x,y': 'Any point on line', 'x₁,y₁': 'Known point', 'm': 'Slope' },
                    derivation: 'Rearrangement of the slope formula to express the linear relationship.',
                    history: 'Developed as part of analytic geometry by mathematicians like Descartes and Fermat.',
                    applications: ['Linear regression', 'Physics motion', 'Engineering analysis', 'Economics'],
                    example: 'Line through (2,3) with slope 4: y - 3 = 4(x - 2) → y = 4x - 5',
                    relatedFormulas: ['slope_formula', 'slope_intercept_form']
                },
                {
                    id: 'slope_intercept_form',
                    name: 'Slope-Intercept Form',
                    formula: 'y = mx + b',
                    description: 'Linear equation with slope m and y-intercept b',
                    variables: { 'y': 'Dependent variable', 'm': 'Slope', 'x': 'Independent variable', 'b': 'Y-intercept' },
                    derivation: 'Standard form derived from point-slope form using y-intercept (0,b).',
                    history: 'Standard notation developed during the formalization of coordinate geometry.',
                    applications: ['Linear modeling', 'Statistics', 'Economics', 'Physics', 'Data analysis'],
                    example: 'Line with slope 2 and y-intercept 3: y = 2x + 3',
                    relatedFormulas: ['point_slope_form', 'standard_form']
                },
                {
                    id: 'vertex_form',
                    name: 'Parabola Vertex Form',
                    formula: 'y = a(x - h)² + k',
                    description: 'Parabola with vertex at (h,k) and vertical stretch factor a',
                    variables: { 'y': 'Output', 'a': 'Stretch factor', 'x': 'Input', 'h,k': 'Vertex coordinates' },
                    derivation: 'Derived from standard form by completing the square.',
                    history: 'Parabolas studied by ancient Greeks, vertex form developed in Renaissance algebra.',
                    applications: ['Projectile motion', 'Optics', 'Architecture', 'Engineering optimization'],
                    example: 'Parabola with vertex (3,2) opening upward: y = (x-3)² + 2',
                    relatedFormulas: ['quadratic_formula', 'standard_form']
                },
                {
                    id: 'discriminant',
                    name: 'Quadratic Discriminant',
                    formula: 'Δ = b² - 4ac',
                    description: 'Determines nature of roots in quadratic equation ax² + bx + c = 0',
                    variables: { 'Δ': 'Discriminant', 'a': 'Coefficient of x²', 'b': 'Coefficient of x', 'c': 'Constant' },
                    derivation: 'Appears naturally in the quadratic formula under the square root.',
                    history: 'Discriminant concept developed alongside quadratic formula during Islamic mathematics.',
                    applications: ['Determining solution types', 'Engineering analysis', 'Physics problems', 'Optimization'],
                    example: 'For x² - 4x + 4 = 0: Δ = 16 - 16 = 0 (one repeated root)',
                    relatedFormulas: ['quadratic_formula', 'nature_of_roots']
                },
                {
                    id: 'compound_interest',
                    name: 'Compound Interest',
                    formula: 'A = P(1 + r/n)^(nt)',
                    description: 'Final amount with principal P, rate r, compounded n times for t years',
                    variables: { 'A': 'Final amount', 'P': 'Principal', 'r': 'Annual rate', 'n': 'Compounds per year', 't': 'Years' },
                    derivation: 'Each period, interest is added to principal, creating exponential growth.',
                    history: 'Compound interest known to ancient civilizations, formalized during Renaissance banking.',
                    applications: ['Banking', 'Investment', 'Loans', 'Economic modeling', 'Retirement planning'],
                    example: '$1000 at 5% compounded quarterly for 2 years: A = 1000(1.0125)⁸ ≈ $1104.89',
                    relatedFormulas: ['simple_interest', 'exponential_growth']
                },
                {
                    id: 'simple_interest',
                    name: 'Simple Interest',
                    formula: 'I = Prt',
                    description: 'Interest earned on principal P at rate r for time t',
                    variables: { 'I': 'Interest', 'P': 'Principal', 'r': 'Annual rate', 't': 'Time in years' },
                    derivation: 'Direct proportional relationship between principal, rate, and time.',
                    history: 'One of the oldest mathematical applications, used in ancient Babylon and Egypt.',
                    applications: ['Basic loans', 'Simple investments', 'Financial education', 'Quick calculations'],
                    example: '$500 at 6% for 3 years: I = 500 × 0.06 × 3 = $90',
                    relatedFormulas: ['compound_interest', 'percentage_formula']
                },
                {
                    id: 'exponential_growth',
                    name: 'Exponential Growth',
                    formula: 'N(t) = N₀e^(rt)',
                    description: 'Population N at time t, starting at N₀ with growth rate r',
                    variables: { 'N(t)': 'Population at time t', 'N₀': 'Initial population', 'r': 'Growth rate', 't': 'Time', 'e': 'Euler\'s number' },
                    derivation: 'Solution to differential equation dN/dt = rN representing proportional growth.',
                    history: 'Exponential functions studied by John Napier (logarithms) and Leonhard Euler.',
                    applications: ['Population biology', 'Radioactive decay', 'Economic growth', 'Epidemiology'],
                    example: 'Population of 1000 growing at 3% annually: N(5) = 1000e^(0.03×5) ≈ 1162',
                    relatedFormulas: ['exponential_decay', 'logarithmic_functions']
                },
                {
                    id: 'logarithmic_functions',
                    name: 'Logarithm Properties',
                    formula: 'log_a(xy) = log_a(x) + log_a(y)',
                    description: 'Logarithm of product equals sum of logarithms',
                    variables: { 'a': 'Base', 'x,y': 'Arguments' },
                    derivation: 'Follows from the definition of logarithms as inverse of exponential functions.',
                    history: 'Logarithms invented by John Napier (1614) to simplify astronomical calculations.',
                    applications: ['Scientific calculations', 'Engineering', 'Computer science', 'Data analysis'],
                    example: 'log₂(8×4) = log₂(8) + log₂(4) = 3 + 2 = 5, and indeed log₂(32) = 5',
                    relatedFormulas: ['exponential_functions', 'change_of_base']
                }
            ],
            calculus: [
                {
                    id: 'power_rule',
                    name: 'Power Rule',
                    formula: 'd/dx[xⁿ] = nxⁿ⁻¹',
                    description: 'Derivative of x raised to the power n',
                    variables: { 'x': 'Variable', 'n': 'Exponent (constant)' },
                    derivation: 'Can be proven using the limit definition of a derivative and the binomial theorem.',
                    history: 'Developed by Isaac Newton and Gottfried Leibniz independently in the late 17th century as part of calculus.',
                    applications: ['Physics motion', 'Engineering optimization', 'Economics marginal analysis', 'Signal processing'],
                    example: 'd/dx[x³] = 3x², d/dx[x⁵] = 5x⁴',
                    relatedFormulas: ['chain_rule', 'product_rule']
                },
                {
                    id: 'chain_rule',
                    name: 'Chain Rule',
                    formula: 'd/dx[f(g(x))] = f\'(g(x)) · g\'(x)',
                    description: 'Derivative of composite functions',
                    variables: { 'f': 'Outer function', 'g': 'Inner function', 'x': 'Variable' },
                    derivation: 'Follows from the limit definition of a derivative and the relationship between composite functions.',
                    history: 'Formalized by Leibniz in the 1670s, though the concept was used implicitly by earlier mathematicians.',
                    applications: ['Physics chain reactions', 'Engineering control systems', 'Economics compound growth', 'Neural networks'],
                    example: 'd/dx[sin(x²)] = cos(x²) · 2x',
                    relatedFormulas: ['power_rule', 'product_rule', 'quotient_rule']
                },
                {
                    id: 'fundamental_theorem',
                    name: 'Fundamental Theorem of Calculus',
                    formula: '∫ₐᵇ f\'(x)dx = f(b) - f(a)',
                    description: 'Connects differentiation and integration',
                    variables: { 'f': 'Function', 'a,b': 'Limits of integration' },
                    derivation: 'Proven by showing that integration and differentiation are inverse operations.',
                    history: 'Established by Newton and Leibniz in the 17th century, revolutionizing mathematics and physics.',
                    applications: ['Physics work calculations', 'Engineering area under curves', 'Probability distributions', 'Economic surplus'],
                    example: '∫₀² 2x dx = x²|₀² = 4 - 0 = 4',
                    relatedFormulas: ['integration_by_parts', 'substitution_rule']
                },
                {
                    id: 'product_rule',
                    name: 'Product Rule',
                    formula: 'd/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
                    description: 'Derivative of product of two functions',
                    variables: { 'f(x),g(x)': 'Functions', 'f\'(x),g\'(x)': 'Their derivatives' },
                    derivation: 'Proven using limit definition of derivative and algebraic manipulation.',
                    history: 'Developed by Leibniz as part of differential calculus in the late 17th century.',
                    applications: ['Physics applications', 'Engineering problems', 'Economics optimization', 'Mathematical modeling'],
                    example: 'd/dx[x²sin(x)] = 2x·sin(x) + x²·cos(x)',
                    relatedFormulas: ['chain_rule', 'quotient_rule']
                },
                {
                    id: 'quotient_rule',
                    name: 'Quotient Rule',
                    formula: 'd/dx[f(x)/g(x)] = [f\'(x)g(x) - f(x)g\'(x)] / [g(x)]²',
                    description: 'Derivative of quotient of two functions',
                    variables: { 'f(x),g(x)': 'Functions', 'f\'(x),g\'(x)': 'Their derivatives' },
                    derivation: 'Can be proven using product rule or limit definition of derivative.',
                    history: 'Developed alongside other differentiation rules during the creation of calculus.',
                    applications: ['Rate problems', 'Optimization', 'Physics ratios', 'Engineering analysis'],
                    example: 'd/dx[x²/(x+1)] = [2x(x+1) - x²(1)] / (x+1)² = (x² + 2x) / (x+1)²',
                    relatedFormulas: ['product_rule', 'chain_rule']
                },
                {
                    id: 'integration_by_parts',
                    name: 'Integration by Parts',
                    formula: '∫u dv = uv - ∫v du',
                    description: 'Integration technique for products of functions',
                    variables: { 'u': 'Function to differentiate', 'v': 'Function to integrate', 'du,dv': 'Differentials' },
                    derivation: 'Derived from the product rule for differentiation.',
                    history: 'Technique formalized by Leibniz and developed throughout calculus history.',
                    applications: ['Physics work problems', 'Engineering applications', 'Probability', 'Mathematical analysis'],
                    example: '∫x·e^x dx: Let u=x, dv=e^x dx → ∫x·e^x dx = xe^x - ∫e^x dx = xe^x - e^x + C',
                    relatedFormulas: ['product_rule', 'substitution_rule']
                },
                {
                    id: 'lhopitals_rule',
                    name: 'L\'Hôpital\'s Rule',
                    formula: 'lim[x→a] f(x)/g(x) = lim[x→a] f\'(x)/g\'(x)',
                    description: 'Evaluate limits of indeterminate forms 0/0 or ∞/∞',
                    variables: { 'f(x),g(x)': 'Functions', 'f\'(x),g\'(x)': 'Their derivatives', 'a': 'Limit point' },
                    derivation: 'Based on Cauchy\'s mean value theorem and properties of derivatives.',
                    history: 'Named after Guillaume de l\'Hôpital (1696), though discovered by Johann Bernoulli.',
                    applications: ['Limit evaluation', 'Asymptotic analysis', 'Engineering problems', 'Mathematical analysis'],
                    example: 'lim[x→0] sin(x)/x = lim[x→0] cos(x)/1 = 1',
                    relatedFormulas: ['limits', 'derivative_rules']
                },
                {
                    id: 'taylor_series',
                    name: 'Taylor Series',
                    formula: 'f(x) = Σ[n=0 to ∞] f^(n)(a)(x-a)^n/n!',
                    description: 'Power series expansion of function around point a',
                    variables: { 'f(x)': 'Function', 'f^(n)(a)': 'nth derivative at a', 'a': 'Expansion point' },
                    derivation: 'Derived by assuming power series representation and finding coefficients.',
                    history: 'Developed by Brook Taylor (1715), building on earlier work by Gregory and others.',
                    applications: ['Function approximation', 'Numerical methods', 'Physics modeling', 'Computer algorithms'],
                    example: 'e^x = 1 + x + x²/2! + x³/3! + ... for all x',
                    relatedFormulas: ['maclaurin_series', 'power_series']
                },
                {
                    id: 'eulers_formula',
                    name: 'Euler\'s Formula',
                    formula: 'e^(iθ) = cos(θ) + i·sin(θ)',
                    description: 'Connects exponential and trigonometric functions via complex numbers',
                    variables: { 'e': 'Euler\'s number', 'i': 'Imaginary unit', 'θ': 'Angle in radians' },
                    derivation: 'Derived from Taylor series expansions of e^x, cos(x), and sin(x).',
                    history: 'Discovered by Leonhard Euler (1748), considered one of the most beautiful formulas in mathematics.',
                    applications: ['Signal processing', 'Quantum mechanics', 'Engineering', 'Complex analysis'],
                    example: 'e^(iπ) = cos(π) + i·sin(π) = -1 + 0i = -1 (Euler\'s identity)',
                    relatedFormulas: ['complex_exponentials', 'trigonometric_identities']
                }
            ],
            physics: [
                {
                    id: 'newtons_second_law',
                    name: 'Newton\'s Second Law',
                    formula: 'F = ma',
                    description: 'Force equals mass times acceleration',
                    variables: { 'F': 'Force (N)', 'm': 'Mass (kg)', 'a': 'Acceleration (m/s²)' },
                    derivation: 'Derived from Newton\'s definition of momentum and its rate of change.',
                    history: 'Formulated by Isaac Newton in 1687 in his "Principia Mathematica", laying the foundation for classical mechanics.',
                    applications: ['Vehicle design', 'Rocket propulsion', 'Sports physics', 'Earthquake engineering'],
                    example: 'A 10 kg object accelerating at 2 m/s² experiences F = 10 × 2 = 20 N of force',
                    relatedFormulas: ['kinematic_equations', 'momentum_conservation']
                },
                {
                    id: 'kinetic_energy',
                    name: 'Kinetic Energy',
                    formula: 'KE = ½mv²',
                    description: 'Energy of motion for an object with mass m and velocity v',
                    variables: { 'KE': 'Kinetic Energy (J)', 'm': 'Mass (kg)', 'v': 'Velocity (m/s)' },
                    derivation: 'Derived by integrating force over distance using Newton\'s second law.',
                    history: 'Concept developed by Gottfried Leibniz in the 17th century, refined during the 19th century energy studies.',
                    applications: ['Vehicle crash testing', 'Renewable energy', 'Particle physics', 'Sports analysis'],
                    example: 'A 5 kg object moving at 10 m/s has KE = ½ × 5 × 10² = 250 J',
                    relatedFormulas: ['potential_energy', 'work_energy_theorem']
                },
                {
                    id: 'ohms_law',
                    name: 'Ohm\'s Law',
                    formula: 'V = IR',
                    description: 'Voltage equals current times resistance',
                    variables: { 'V': 'Voltage (V)', 'I': 'Current (A)', 'R': 'Resistance (Ω)' },
                    derivation: 'Based on empirical observations of linear relationship between voltage and current in conductors.',
                    history: 'Discovered by Georg Simon Ohm in 1827 through careful experiments with electrical circuits.',
                    applications: ['Circuit design', 'Electronic devices', 'Power systems', 'Battery calculations'],
                    example: 'A circuit with 12V and 4Ω resistance carries I = V/R = 12/4 = 3A current',
                    relatedFormulas: ['power_law', 'kirchhoffs_laws']
                },
                {
                    id: 'wave_equation',
                    name: 'Wave Speed',
                    formula: 'v = fλ',
                    description: 'Wave speed equals frequency times wavelength',
                    variables: { 'v': 'Wave speed (m/s)', 'f': 'Frequency (Hz)', 'λ': 'Wavelength (m)' },
                    derivation: 'Follows from the definition of frequency as cycles per second and wavelength as distance per cycle.',
                    history: 'Wave theory developed by Christiaan Huygens in the 17th century, refined by later physicists.',
                    applications: ['Radio communications', 'Optics', 'Medical ultrasound', 'Musical instruments'],
                    example: 'A wave with frequency 100 Hz and wavelength 2 m has speed v = 100 × 2 = 200 m/s',
                    relatedFormulas: ['doppler_effect', 'wave_interference']
                },
                {
                    id: 'potential_energy',
                    name: 'Gravitational Potential Energy',
                    formula: 'PE = mgh',
                    description: 'Potential energy of object at height h in gravitational field',
                    variables: { 'PE': 'Potential Energy (J)', 'm': 'Mass (kg)', 'g': 'Gravity (9.8 m/s²)', 'h': 'Height (m)' },
                    derivation: 'Work done against gravity to lift object to height h.',
                    history: 'Energy concept developed during 19th century, building on Newton\'s mechanics.',
                    applications: ['Hydroelectric power', 'Roller coasters', 'Pendulums', 'Architecture'],
                    example: '10 kg object at 5 m height: PE = 10 × 9.8 × 5 = 490 J',
                    relatedFormulas: ['kinetic_energy', 'conservation_of_energy']
                },
                {
                    id: 'power_law',
                    name: 'Electrical Power',
                    formula: 'P = VI = I²R = V²/R',
                    description: 'Power dissipated in electrical circuit',
                    variables: { 'P': 'Power (W)', 'V': 'Voltage (V)', 'I': 'Current (A)', 'R': 'Resistance (Ω)' },
                    derivation: 'Power equals rate of energy transfer, derived from Ohm\'s law.',
                    history: 'Electrical power relationships discovered during 19th century electrical research.',
                    applications: ['Circuit design', 'Power systems', 'Electronics', 'Energy efficiency'],
                    example: 'Circuit with 12V and 3A: P = 12 × 3 = 36 W',
                    relatedFormulas: ['ohms_law', 'energy_conservation']
                },
                {
                    id: 'momentum_conservation',
                    name: 'Conservation of Momentum',
                    formula: 'm₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\'',
                    description: 'Total momentum before equals total momentum after collision',
                    variables: { 'm₁,m₂': 'Masses', 'v₁,v₂': 'Initial velocities', 'v₁\',v₂\'': 'Final velocities' },
                    derivation: 'Follows from Newton\'s third law and definition of momentum.',
                    history: 'Momentum concept developed by Newton, conservation principle by later physicists.',
                    applications: ['Collision analysis', 'Rocket propulsion', 'Sports physics', 'Particle physics'],
                    example: '5kg at 4m/s hits 3kg at rest, stick together: (5×4 + 3×0) = 8v → v = 2.5 m/s',
                    relatedFormulas: ['newtons_second_law', 'impulse_momentum']
                },
                {
                    id: 'gas_laws',
                    name: 'Ideal Gas Law',
                    formula: 'PV = nRT',
                    description: 'Relationship between pressure, volume, amount, and temperature of gas',
                    variables: { 'P': 'Pressure', 'V': 'Volume', 'n': 'Amount (moles)', 'R': 'Gas constant', 'T': 'Temperature (K)' },
                    derivation: 'Combines Boyle\'s, Charles\'s, and Avogadro\'s laws.',
                    history: 'Combined from separate gas laws discovered in 17th-19th centuries.',
                    applications: ['Chemical engineering', 'Meteorology', 'Respiratory physiology', 'Industrial processes'],
                    example: '2 moles of gas at 300K and 1L: P = (2 × 8.314 × 300) / 1 = 4988 Pa',
                    relatedFormulas: ['boyles_law', 'charles_law']
                },
                {
                    id: 'coulombs_law',
                    name: 'Coulomb\'s Law',
                    formula: 'F = k(q₁q₂)/r²',
                    description: 'Electrostatic force between two point charges',
                    variables: { 'F': 'Force (N)', 'k': 'Coulomb constant', 'q₁,q₂': 'Charges (C)', 'r': 'Distance (m)' },
                    derivation: 'Empirical law discovered through careful experimentation with charged objects.',
                    history: 'Discovered by Charles-Augustin de Coulomb (1785) using torsion balance experiments.',
                    applications: ['Atomic physics', 'Electronics', 'Chemistry', 'Materials science'],
                    example: 'Two 1μC charges 1m apart: F = 8.99×10⁹ × (10⁻⁶)² / 1² = 0.00899 N',
                    relatedFormulas: ['electric_field', 'gauss_law']
                },
                {
                    id: 'doppler_effect',
                    name: 'Doppler Effect',
                    formula: 'f\' = f(v ± vᵣ)/(v ± vₛ)',
                    description: 'Frequency shift due to relative motion between source and observer',
                    variables: { 'f\'': 'Observed frequency', 'f': 'Source frequency', 'v': 'Wave speed', 'vᵣ': 'Receiver velocity', 'vₛ': 'Source velocity' },
                    derivation: 'Based on wave compression/expansion due to relative motion.',
                    history: 'Discovered by Christian Doppler (1842), first tested with sound waves.',
                    applications: ['Radar systems', 'Medical ultrasound', 'Astronomy', 'Weather forecasting'],
                    example: 'Ambulance siren at 1000 Hz approaching at 30 m/s in 340 m/s sound: f\' = 1000(340+0)/(340-30) ≈ 1097 Hz',
                    relatedFormulas: ['wave_equation', 'frequency_relationships']
                },
                {
                    id: 'einsteins_mass_energy',
                    name: 'Mass-Energy Equivalence',
                    formula: 'E = mc²',
                    description: 'Energy equivalent of mass, fundamental to relativity',
                    variables: { 'E': 'Energy (J)', 'm': 'Mass (kg)', 'c': 'Speed of light (3×10⁸ m/s)' },
                    derivation: 'Derived from special relativity and Lorentz transformations.',
                    history: 'Derived by Albert Einstein (1905) as consequence of special relativity theory.',
                    applications: ['Nuclear physics', 'Particle physics', 'Nuclear power', 'Cosmology'],
                    example: '1 kg of matter: E = 1 × (3×10⁸)² = 9×10¹⁶ J (equivalent to ~25 billion kWh)',
                    relatedFormulas: ['relativistic_energy', 'nuclear_binding']
                },
                {
                    id: 'gravitational_force',
                    name: 'Newton\'s Law of Gravitation',
                    formula: 'F = G(m₁m₂)/r²',
                    description: 'Gravitational force between two masses',
                    variables: { 'F': 'Force (N)', 'G': 'Gravitational constant', 'm₁,m₂': 'Masses (kg)', 'r': 'Distance (m)' },
                    derivation: 'Universal law derived from observations of planetary motion and Kepler\'s laws.',
                    history: 'Formulated by Isaac Newton (1687) in Principia Mathematica.',
                    applications: ['Orbital mechanics', 'Astronomy', 'Satellite design', 'Planetary science'],
                    example: 'Earth-Moon force: F = 6.67×10⁻¹¹ × (6×10²⁴ × 7.3×10²²) / (3.8×10⁸)² ≈ 2×10²⁰ N',
                    relatedFormulas: ['orbital_mechanics', 'escape_velocity']
                }
            ],
            statistics: [
                {
                    id: 'mean_formula',
                    name: 'Arithmetic Mean',
                    formula: 'μ = (Σxi) / n',
                    description: 'Average of a set of values',
                    variables: { 'μ': 'Mean', 'xi': 'Individual values', 'n': 'Number of values' },
                    derivation: 'Sum of all values divided by the count, representing the central tendency.',
                    history: 'Concept used since ancient times, formalized in probability theory by Pierre-Simon Laplace in the 18th century.',
                    applications: ['Quality control', 'Market research', 'Academic grading', 'Scientific analysis'],
                    example: 'Mean of [2, 4, 6, 8, 10]: μ = (2+4+6+8+10)/5 = 30/5 = 6',
                    relatedFormulas: ['variance', 'standard_deviation']
                },
                {
                    id: 'standard_deviation',
                    name: 'Standard Deviation',
                    formula: 'σ = √[Σ(xi - μ)² / n]',
                    description: 'Measure of spread or variability in data',
                    variables: { 'σ': 'Standard deviation', 'xi': 'Individual values', 'μ': 'Mean', 'n': 'Count' },
                    derivation: 'Square root of variance, representing average distance from the mean.',
                    history: 'Developed by Karl Pearson in 1894, building on earlier work by Abraham de Moivre.',
                    applications: ['Risk analysis', 'Quality control', 'Psychology testing', 'Financial modeling'],
                    example: 'For data [1,2,3,4,5] with mean 3: σ = √[(1-3)²+(2-3)²+(3-3)²+(4-3)²+(5-3)²]/5 = √2 ≈ 1.41',
                    relatedFormulas: ['variance', 'normal_distribution']
                },
                {
                    id: 'probability_formula',
                    name: 'Basic Probability',
                    formula: 'P(A) = n(A) / n(S)',
                    description: 'Probability of event A occurring',
                    variables: { 'P(A)': 'Probability of A', 'n(A)': 'Favorable outcomes', 'n(S)': 'Total outcomes' },
                    derivation: 'Based on the classical definition of probability as favorable outcomes over total outcomes.',
                    history: 'Formal probability theory founded by Blaise Pascal and Pierre de Fermat in the 17th century.',
                    applications: ['Insurance', 'Gaming', 'Medical diagnosis', 'Weather forecasting'],
                    example: 'Probability of rolling a 6 on a die: P(6) = 1/6 ≈ 0.167 or 16.7%',
                    relatedFormulas: ['conditional_probability', 'bayes_theorem']
                },
                {
                    id: 'conditional_probability',
                    name: 'Conditional Probability',
                    formula: 'P(A|B) = P(A ∩ B) / P(B)',
                    description: 'Probability of A given that B has occurred',
                    variables: { 'P(A|B)': 'Conditional probability', 'P(A ∩ B)': 'Joint probability', 'P(B)': 'Probability of B' },
                    derivation: 'Follows from the definition of conditional probability and independence.',
                    history: 'Developed as part of probability theory by mathematicians like Laplace and Bayes.',
                    applications: ['Medical testing', 'Machine learning', 'Risk assessment', 'Quality control'],
                    example: 'P(Rain|Cloudy) = P(Rain and Cloudy) / P(Cloudy) = 0.3 / 0.6 = 0.5',
                    relatedFormulas: ['bayes_theorem', 'independence']
                },
                {
                    id: 'bayes_theorem',
                    name: 'Bayes\' Theorem',
                    formula: 'P(A|B) = P(B|A)P(A) / P(B)',
                    description: 'Update probability of A given new evidence B',
                    variables: { 'P(A|B)': 'Posterior probability', 'P(B|A)': 'Likelihood', 'P(A)': 'Prior probability', 'P(B)': 'Evidence' },
                    derivation: 'Derived from definition of conditional probability and symmetry.',
                    history: 'Named after Thomas Bayes (1763), fundamental to modern statistics and AI.',
                    applications: ['Medical diagnosis', 'Machine learning', 'Spam filtering', 'Statistical inference'],
                    example: 'Disease test 99% accurate, 1% prevalence: P(Disease|+) = (0.99×0.01) / (0.99×0.01 + 0.01×0.99) ≈ 0.5',
                    relatedFormulas: ['conditional_probability', 'total_probability']
                },
                {
                    id: 'variance',
                    name: 'Variance',
                    formula: 'σ² = Σ(xi - μ)² / n',
                    description: 'Measure of spread in data distribution',
                    variables: { 'σ²': 'Variance', 'xi': 'Data points', 'μ': 'Mean', 'n': 'Sample size' },
                    derivation: 'Average of squared deviations from the mean.',
                    history: 'Developed alongside standard deviation in 19th century statistics.',
                    applications: ['Risk analysis', 'Quality control', 'Finance', 'Scientific research'],
                    example: 'Data [1,3,5,7,9] with mean 5: σ² = [(1-5)²+(3-5)²+(5-5)²+(7-5)²+(9-5)²]/5 = 8',
                    relatedFormulas: ['standard_deviation', 'covariance']
                },
                {
                    id: 'normal_distribution',
                    name: 'Normal Distribution',
                    formula: 'f(x) = (1/σ√(2π)) × e^(-(x-μ)²/(2σ²))',
                    description: 'Probability density function of normal (Gaussian) distribution',
                    variables: { 'f(x)': 'Probability density', 'μ': 'Mean', 'σ': 'Standard deviation', 'π': 'Pi', 'e': 'Euler\'s number' },
                    derivation: 'Arises from central limit theorem and maximum entropy principle.',
                    history: 'Discovered by Carl Friedrich Gauss, fundamental to statistics and natural phenomena.',
                    applications: ['Quality control', 'Psychology', 'Finance', 'Natural science', 'Measurement error'],
                    example: 'Standard normal (μ=0, σ=1): f(0) = 1/√(2π) ≈ 0.399',
                    relatedFormulas: ['central_limit_theorem', 'z_score']
                },
                {
                    id: 'correlation_coefficient',
                    name: 'Correlation Coefficient',
                    formula: 'r = Σ[(xi-x̄)(yi-ȳ)] / √[Σ(xi-x̄)²Σ(yi-ȳ)²]',
                    description: 'Measure of linear relationship between two variables',
                    variables: { 'r': 'Correlation (-1 to 1)', 'xi,yi': 'Data pairs', 'x̄,ȳ': 'Means' },
                    derivation: 'Normalized covariance to be scale-independent.',
                    history: 'Developed by Karl Pearson in the 1890s for statistical analysis.',
                    applications: ['Data analysis', 'Economics', 'Psychology', 'Quality control', 'Research'],
                    example: 'Perfect positive correlation r = 1, no correlation r = 0, perfect negative r = -1',
                    relatedFormulas: ['covariance', 'regression_analysis']
                },
                {
                    id: 'permutations',
                    name: 'Permutations',
                    formula: 'P(n,r) = n! / (n-r)!',
                    description: 'Number of ways to arrange r objects from n objects (order matters)',
                    variables: { 'P(n,r)': 'Permutations', 'n': 'Total objects', 'r': 'Objects selected', '!': 'Factorial' },
                    derivation: 'First position has n choices, second has n-1, etc., giving n×(n-1)×...×(n-r+1).',
                    history: 'Combinatorics developed by ancient mathematicians, formalized in medieval times.',
                    applications: ['Scheduling', 'Password security', 'Tournament brackets', 'Optimization'],
                    example: 'Arrange 3 people from 5: P(5,3) = 5!/(5-3)! = 120/2 = 60 ways',
                    relatedFormulas: ['combinations', 'factorial']
                },
                {
                    id: 'combinations',
                    name: 'Combinations',
                    formula: 'C(n,r) = n! / (r!(n-r)!)',
                    description: 'Number of ways to choose r objects from n objects (order doesn\'t matter)',
                    variables: { 'C(n,r)': 'Combinations', 'n': 'Total objects', 'r': 'Objects selected', '!': 'Factorial' },
                    derivation: 'Permutations divided by r! to account for order not mattering.',
                    history: 'Binomial coefficients studied by Pascal, Newton, and other mathematicians.',
                    applications: ['Lottery calculations', 'Committee selection', 'Probability', 'Statistics'],
                    example: 'Choose 3 people from 5: C(5,3) = 5!/(3!×2!) = 120/(6×2) = 10 ways',
                    relatedFormulas: ['permutations', 'binomial_theorem']
                },
                {
                    id: 'z_score',
                    name: 'Z-Score (Standard Score)',
                    formula: 'z = (x - μ) / σ',
                    description: 'Number of standard deviations a value is from the mean',
                    variables: { 'z': 'Z-score', 'x': 'Data value', 'μ': 'Population mean', 'σ': 'Population standard deviation' },
                    derivation: 'Standardizes values to allow comparison across different distributions.',
                    history: 'Standardization concept developed in early 20th century statistics.',
                    applications: ['Test scoring', 'Quality control', 'Outlier detection', 'Research analysis'],
                    example: 'Score of 85 with mean 75 and σ=10: z = (85-75)/10 = 1.0 (1 standard deviation above)',
                    relatedFormulas: ['normal_distribution', 'standard_deviation']
                },
                {
                    id: 'confidence_interval',
                    name: 'Confidence Interval',
                    formula: 'CI = x̄ ± z(σ/√n)',
                    description: 'Range likely to contain the true population parameter',
                    variables: { 'CI': 'Confidence interval', 'x̄': 'Sample mean', 'z': 'Z-value', 'σ': 'Standard deviation', 'n': 'Sample size' },
                    derivation: 'Based on sampling distribution of the mean and normal approximation.',
                    history: 'Developed by Jerzy Neyman in the 1930s for statistical inference.',
                    applications: ['Polling', 'Medical research', 'Quality assurance', 'Scientific studies'],
                    example: '95% CI for mean with x̄=50, σ=10, n=100: 50 ± 1.96×(10/√100) = 50 ± 1.96',
                    relatedFormulas: ['z_score', 'sample_size']
                }
            ],
            trigonometry: [
                {
                    id: 'sine_rule',
                    name: 'Law of Sines',
                    formula: 'a/sin(A) = b/sin(B) = c/sin(C)',
                    description: 'Ratio of side length to sine of opposite angle is constant',
                    variables: { 'a,b,c': 'Side lengths', 'A,B,C': 'Opposite angles' },
                    derivation: 'Derived using area formula and trigonometric relationships in triangles.',
                    history: 'Known to ancient mathematicians, formalized during medieval Islamic mathematics.',
                    applications: ['Navigation', 'Surveying', 'Engineering', 'Astronomy'],
                    example: 'Triangle with a=10, A=30°, B=45°: b = 10×sin(45°)/sin(30°) = 10×0.707/0.5 = 14.14',
                    relatedFormulas: ['cosine_rule', 'triangle_area']
                },
                {
                    id: 'cosine_rule',
                    name: 'Law of Cosines',
                    formula: 'c² = a² + b² - 2ab·cos(C)',
                    description: 'Generalization of Pythagorean theorem for any triangle',
                    variables: { 'a,b,c': 'Side lengths', 'C': 'Angle opposite side c' },
                    derivation: 'Derived using coordinate geometry and dot product of vectors.',
                    history: 'Generalization of Pythagorean theorem, known to ancient mathematicians.',
                    applications: ['Navigation', 'Physics', 'Engineering', 'Computer graphics'],
                    example: 'Triangle with sides a=3, b=4, angle C=60°: c² = 9+16-24×cos(60°) = 25-12 = 13, c=√13',
                    relatedFormulas: ['sine_rule', 'pythagorean_theorem']
                },
                {
                    id: 'trig_identities',
                    name: 'Pythagorean Identity',
                    formula: 'sin²(θ) + cos²(θ) = 1',
                    description: 'Fundamental trigonometric identity',
                    variables: { 'θ': 'Angle', 'sin': 'Sine function', 'cos': 'Cosine function' },
                    derivation: 'Follows from definition of sine and cosine on unit circle.',
                    history: 'Fundamental relationship discovered through geometric analysis of circles.',
                    applications: ['Simplifying expressions', 'Solving equations', 'Physics', 'Engineering'],
                    example: 'If sin(θ) = 0.6, then cos²(θ) = 1 - 0.36 = 0.64, so cos(θ) = ±0.8',
                    relatedFormulas: ['double_angle_formulas', 'sum_formulas']
                },
                {
                    id: 'double_angle',
                    name: 'Double Angle Formulas',
                    formula: 'sin(2θ) = 2sin(θ)cos(θ), cos(2θ) = cos²(θ) - sin²(θ)',
                    description: 'Trigonometric functions of double angles',
                    variables: { 'θ': 'Angle' },
                    derivation: 'Derived from sum formulas by setting both angles equal.',
                    history: 'Developed as extension of basic trigonometric relationships.',
                    applications: ['Signal processing', 'Physics oscillations', 'Engineering', 'Computer graphics'],
                    example: 'sin(60°) = 2sin(30°)cos(30°) = 2×0.5×(√3/2) = √3/2 ≈ 0.866',
                    relatedFormulas: ['sum_formulas', 'half_angle_formulas']
                },
                {
                    id: 'sum_formulas',
                    name: 'Sum and Difference Formulas',
                    formula: 'sin(A±B) = sin(A)cos(B) ± cos(A)sin(B)',
                    description: 'Sine and cosine of sum/difference of angles',
                    variables: { 'A,B': 'Angles' },
                    derivation: 'Derived using rotation matrices or geometric constructions.',
                    history: 'Developed by ancient astronomers and mathematicians for celestial calculations.',
                    applications: ['Wave interference', 'Signal processing', 'Astronomy', 'Physics'],
                    example: 'sin(75°) = sin(45°+30°) = sin(45°)cos(30°) + cos(45°)sin(30°) = (√2/2)(√3/2) + (√2/2)(1/2)',
                    relatedFormulas: ['double_angle', 'product_to_sum']
                }
            ],
            chemistry: [
                {
                    id: 'molarity',
                    name: 'Molarity',
                    formula: 'M = n / V',
                    description: 'Molar concentration: moles of solute per liter of solution',
                    variables: { 'M': 'Molarity (mol/L)', 'n': 'Moles of solute', 'V': 'Volume of solution (L)' },
                    derivation: 'Concentration defined as amount of substance per unit volume.',
                    history: 'Concentration units developed during the systematization of chemistry in 19th century.',
                    applications: ['Chemical reactions', 'Laboratory work', 'Pharmaceutical preparations', 'Industrial processes'],
                    example: '0.5 moles of NaCl in 2 L solution: M = 0.5/2 = 0.25 mol/L',
                    relatedFormulas: ['molality', 'dilution_formula']
                },
                {
                    id: 'ph_formula',
                    name: 'pH Scale',
                    formula: 'pH = -log₁₀[H⁺]',
                    description: 'Measure of acidity/basicity of aqueous solution',
                    variables: { 'pH': 'Acidity measure', '[H⁺]': 'Hydrogen ion concentration (mol/L)' },
                    derivation: 'Logarithmic scale to handle wide range of hydrogen ion concentrations.',
                    history: 'Introduced by Søren Sørensen in 1909 for brewery quality control.',
                    applications: ['Water treatment', 'Food science', 'Medicine', 'Environmental monitoring'],
                    example: '[H⁺] = 1×10⁻³ mol/L: pH = -log₁₀(10⁻³) = 3 (acidic)',
                    relatedFormulas: ['poh_formula', 'acid_dissociation']
                },
                {
                    id: 'avogadros_number',
                    name: 'Avogadro\'s Number',
                    formula: 'N = n × Nₐ',
                    description: 'Number of particles in given amount of substance',
                    variables: { 'N': 'Number of particles', 'n': 'Amount (moles)', 'Nₐ': 'Avogadro\'s number (6.022×10²³)' },
                    derivation: 'Defined as number of atoms in 12 grams of carbon-12.',
                    history: 'Named after Amedeo Avogadro, value determined through various 20th century experiments.',
                    applications: ['Stoichiometry', 'Molecular calculations', 'Material science', 'Nuclear physics'],
                    example: '2 moles of atoms: N = 2 × 6.022×10²³ = 1.204×10²⁴ atoms',
                    relatedFormulas: ['molar_mass', 'stoichiometry']
                },
                {
                    id: 'rate_law',
                    name: 'Rate Law',
                    formula: 'Rate = k[A]ᵐ[B]ⁿ',
                    description: 'Relationship between reaction rate and reactant concentrations',
                    variables: { 'Rate': 'Reaction rate', 'k': 'Rate constant', '[A],[B]': 'Concentrations', 'm,n': 'Reaction orders' },
                    derivation: 'Empirical relationship determined through experimental kinetics studies.',
                    history: 'Chemical kinetics developed in 19th century by chemists like van\'t Hoff.',
                    applications: ['Chemical engineering', 'Drug development', 'Industrial processes', 'Environmental chemistry'],
                    example: 'For A + B → products with rate = k[A]²[B]: doubling [A] increases rate 4×',
                    relatedFormulas: ['arrhenius_equation', 'half_life']
                }
            ],
            finance: [
                {
                    id: 'present_value',
                    name: 'Present Value',
                    formula: 'PV = FV / (1 + r)ⁿ',
                    description: 'Current value of future sum discounted at interest rate',
                    variables: { 'PV': 'Present value', 'FV': 'Future value', 'r': 'Interest rate', 'n': 'Number of periods' },
                    derivation: 'Inverse of compound interest formula, accounting for time value of money.',
                    history: 'Time value of money concept developed during Renaissance banking and commerce.',
                    applications: ['Investment analysis', 'Loan calculations', 'Retirement planning', 'Corporate finance'],
                    example: '$1000 in 5 years at 6%: PV = 1000/(1.06)⁵ = $747.26',
                    relatedFormulas: ['compound_interest', 'net_present_value']
                },
                {
                    id: 'annuity_formula',
                    name: 'Annuity Present Value',
                    formula: 'PV = PMT × [(1-(1+r)⁻ⁿ)/r]',
                    description: 'Present value of series of equal periodic payments',
                    variables: { 'PV': 'Present value', 'PMT': 'Payment amount', 'r': 'Interest rate per period', 'n': 'Number of payments' },
                    derivation: 'Sum of geometric series representing discounted future payments.',
                    history: 'Annuity calculations essential for insurance and pension mathematics.',
                    applications: ['Mortgage calculations', 'Pension planning', 'Insurance', 'Loan amortization'],
                    example: '$500 monthly for 10 years at 6% annual (0.5% monthly): PV = 500×[(1-1.005⁻¹²⁰)/0.005] ≈ $44,955',
                    relatedFormulas: ['present_value', 'future_value_annuity']
                },
                {
                    id: 'mortgage_payment',
                    name: 'Mortgage Payment',
                    formula: 'PMT = P × [r(1+r)ⁿ] / [(1+r)ⁿ-1]',
                    description: 'Monthly payment for fixed-rate mortgage',
                    variables: { 'PMT': 'Monthly payment', 'P': 'Principal amount', 'r': 'Monthly interest rate', 'n': 'Number of payments' },
                    derivation: 'Rearrangement of annuity present value formula to solve for payment.',
                    history: 'Mortgage mathematics developed alongside modern banking systems.',
                    applications: ['Home buying', 'Real estate', 'Banking', 'Financial planning'],
                    example: '$200,000 loan, 30 years, 6% annual (0.5% monthly): PMT = 200000×[0.005×1.005³⁶⁰]/(1.005³⁶⁰-1) ≈ $1,199',
                    relatedFormulas: ['annuity_formula', 'loan_balance']
                },
                {
                    id: 'capm',
                    name: 'Capital Asset Pricing Model',
                    formula: 'E(R) = Rf + β(E(Rm) - Rf)',
                    description: 'Expected return based on risk-free rate and market risk premium',
                    variables: { 'E(R)': 'Expected return', 'Rf': 'Risk-free rate', 'β': 'Beta (systematic risk)', 'E(Rm)': 'Expected market return' },
                    derivation: 'Theoretical model based on portfolio theory and market equilibrium.',
                    history: 'Developed by William Sharpe, John Lintner, and Jack Treynor in 1960s.',
                    applications: ['Investment analysis', 'Portfolio management', 'Corporate finance', 'Risk assessment'],
                    example: 'Risk-free rate 3%, market return 10%, β=1.5: E(R) = 3% + 1.5×(10%-3%) = 13.5%',
                    relatedFormulas: ['portfolio_theory', 'sharpe_ratio']
                }
            ],
            conversion: [
                {
                    id: 'temperature_conversions',
                    name: 'Temperature Conversions',
                    formula: '°F = (9/5)°C + 32, K = °C + 273.15',
                    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
                    variables: { '°C': 'Celsius', '°F': 'Fahrenheit', 'K': 'Kelvin' },
                    derivation: 'Linear relationships based on freezing/boiling points and absolute zero.',
                    history: 'Temperature scales developed by Celsius (1742), Fahrenheit (1724), and Kelvin (1848).',
                    applications: ['Weather forecasting', 'Cooking', 'Scientific research', 'Engineering'],
                    example: '25°C to Fahrenheit: °F = (9/5)×25 + 32 = 77°F',
                    relatedFormulas: ['unit_conversions', 'thermal_physics']
                },
                {
                    id: 'speed_conversions',
                    name: 'Speed Conversions',
                    formula: '1 mph = 1.60934 km/h = 0.44704 m/s',
                    description: 'Convert between miles per hour, kilometers per hour, meters per second',
                    variables: { 'mph': 'Miles per hour', 'km/h': 'Kilometers per hour', 'm/s': 'Meters per second' },
                    derivation: 'Based on distance unit conversions and time relationships.',
                    history: 'Speed units developed with transportation and scientific measurement needs.',
                    applications: ['Transportation', 'Sports', 'Physics', 'Engineering'],
                    example: '60 mph = 60 × 1.60934 = 96.56 km/h',
                    relatedFormulas: ['distance_conversions', 'unit_analysis']
                },
                {
                    id: 'energy_conversions',
                    name: 'Energy Conversions',
                    formula: '1 kWh = 3.6×10⁶ J = 3412 BTU = 860 kcal',
                    description: 'Convert between different energy units',
                    variables: { 'kWh': 'Kilowatt-hour', 'J': 'Joules', 'BTU': 'British thermal units', 'kcal': 'Kilocalories' },
                    derivation: 'Based on fundamental energy definitions and historical measurement systems.',
                    history: 'Energy units developed alongside thermodynamics and electrical power systems.',
                    applications: ['Utility billing', 'Engineering', 'Nutrition', 'HVAC systems'],
                    example: '5 kWh = 5 × 3.6×10⁶ = 1.8×10⁷ J',
                    relatedFormulas: ['power_conversions', 'thermal_conversions']
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCategoryButtons();
        this.displayFormulaList();
    }

    bindEvents() {
        const categoryBtns = document.querySelectorAll('#formulas-calculator .category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.setCategory(category);
            });
        });

        // Search functionality (if implemented)
        this.bindSearchEvents();
    }

    bindSearchEvents() {
        // Add search input if it doesn't exist
        const formulasHeader = document.querySelector('.formulas-header');
        if (formulasHeader && !document.querySelector('.formulas-search')) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'formulas-search';
            searchContainer.style.cssText = 'margin-top: 1rem;';
            
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search formulas...';
            searchInput.className = 'search-input';
            searchInput.style.cssText = `
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: var(--surface-color);
                color: var(--text-primary);
                font-size: 1rem;
            `;
            
            searchContainer.appendChild(searchInput);
            formulasHeader.appendChild(searchContainer);

            searchInput.addEventListener('input', (e) => {
                this.searchFormulas(e.target.value);
            });
        }
    }

    setCategory(category) {
        this.currentCategory = category;
        this.selectedFormula = null;
        this.updateCategoryButtons();
        this.displayFormulaList();
        this.clearFormulaDetail();
    }

    updateCategoryButtons() {
        const categoryBtns = document.querySelectorAll('#formulas-calculator .category-btn');
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === this.currentCategory) {
                btn.classList.add('active');
            }
        });
    }

    displayFormulaList() {
        const formulaList = document.getElementById('formula-list');
        if (!formulaList) return;

        const formulas = this.formulas[this.currentCategory] || [];
        
        if (formulas.length === 0) {
            formulaList.innerHTML = '<p>No formulas available in this category.</p>';
            return;
        }

        formulaList.innerHTML = formulas.map(formula => `
            <div class="formula-item" data-id="${formula.id}">
                <div class="formula-name">${formula.name}</div>
                <div class="formula-preview">${this.escapeHtml(formula.formula)}</div>
            </div>
        `).join('');

        // Add click listeners
        formulaList.querySelectorAll('.formula-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const formulaId = e.currentTarget.dataset.id;
                this.selectFormula(formulaId);
            });
        });
    }

    selectFormula(formulaId) {
        // Update selected state
        document.querySelectorAll('.formula-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const selectedItem = document.querySelector(`[data-id="${formulaId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        // Find and display formula details
        const formula = this.findFormulaById(formulaId);
        if (formula) {
            this.selectedFormula = formula;
            this.displayFormulaDetail(formula);
        }
    }

    findFormulaById(id) {
        for (const category in this.formulas) {
            const formula = this.formulas[category].find(f => f.id === id);
            if (formula) return formula;
        }
        return null;
    }

    displayFormulaDetail(formula) {
        const detailContainer = document.getElementById('formula-detail');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <div class="formula-detail-content">
                <h3 class="formula-title">${formula.name}</h3>
                
                <div class="formula-main">
                    <div class="formula-equation">${this.escapeHtml(formula.formula)}</div>
                    <p class="formula-description">${formula.description}</p>
                </div>

                <div class="formula-section">
                    <h4>Variables</h4>
                    <div class="variables-list">
                        ${Object.entries(formula.variables).map(([symbol, meaning]) => `
                            <div class="variable-item">
                                <span class="variable-symbol">${symbol}</span>
                                <span class="variable-meaning">${meaning}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="formula-section">
                    <h4>Derivation</h4>
                    <p class="formula-derivation">${formula.derivation}</p>
                </div>

                <div class="formula-section">
                    <h4>Historical Background</h4>
                    <p class="formula-history">${formula.history}</p>
                </div>

                <div class="formula-section">
                    <h4>Applications</h4>
                    <ul class="applications-list">
                        ${formula.applications.map(app => `<li>${app}</li>`).join('')}
                    </ul>
                </div>

                <div class="formula-section">
                    <h4>Example</h4>
                    <div class="formula-example">${formula.example}</div>
                </div>

                ${formula.relatedFormulas && formula.relatedFormulas.length > 0 ? `
                    <div class="formula-section">
                        <h4>Related Formulas</h4>
                        <div class="related-formulas">
                            ${formula.relatedFormulas.map(id => {
                                const related = this.findFormulaById(id);
                                return related ? `
                                    <button class="related-formula-btn" data-id="${id}">
                                        ${related.name}
                                    </button>
                                ` : '';
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="formula-actions">
                    <button class="formula-action-btn" onclick="formulasManager.copyFormula('${formula.id}')">
                        <i class="fas fa-copy"></i> Copy Formula
                    </button>
                    <button class="formula-action-btn" onclick="formulasManager.addToFavorites('${formula.id}')">
                        <i class="fas fa-heart"></i> Add to Favorites
                    </button>
                    <button class="formula-action-btn" onclick="formulasManager.calculateExample('${formula.id}')">
                        <i class="fas fa-calculator"></i> Calculate Example
                    </button>
                </div>
            </div>
        `;

        // Add styles for the detail content
        this.addFormulaDetailStyles();

        // Bind related formula buttons
        detailContainer.querySelectorAll('.related-formula-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const relatedId = e.target.dataset.id;
                this.selectFormula(relatedId);
            });
        });
    }

    addFormulaDetailStyles() {
        if (document.querySelector('#formula-detail-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'formula-detail-styles';
        styles.textContent = `
            .formula-detail-content {
                line-height: 1.6;
            }

            .formula-title {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }

            .formula-main {
                background: var(--surface-color);
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 2rem;
                border: 1px solid var(--border-color);
            }

            .formula-equation {
                font-family: 'Courier New', monospace;
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--primary-color);
                text-align: center;
                margin-bottom: 1rem;
                padding: 1rem;
                background: var(--background-color);
                border-radius: 8px;
            }

            .formula-description {
                text-align: center;
                color: var(--text-secondary);
                font-size: 1.1rem;
            }

            .formula-section {
                margin-bottom: 2rem;
            }

            .formula-section h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1.2rem;
                border-bottom: 2px solid var(--primary-color);
                padding-bottom: 0.5rem;
            }

            .variables-list {
                display: grid;
                gap: 0.5rem;
            }

            .variable-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0.5rem;
                background: var(--background-color);
                border-radius: 6px;
            }

            .variable-symbol {
                font-family: 'Courier New', monospace;
                font-weight: bold;
                color: var(--primary-color);
                min-width: 3rem;
            }

            .variable-meaning {
                color: var(--text-secondary);
            }

            .formula-derivation, .formula-history {
                color: var(--text-primary);
                line-height: 1.7;
            }

            .applications-list {
                list-style: none;
                padding: 0;
            }

            .applications-list li {
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--border-color);
                color: var(--text-secondary);
            }

            .applications-list li:before {
                content: "▸ ";
                color: var(--primary-color);
                font-weight: bold;
            }

            .formula-example {
                background: var(--surface-color);
                padding: 1rem;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                border-left: 4px solid var(--primary-color);
            }

            .related-formulas {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }

            .related-formula-btn {
                padding: 0.5rem 1rem;
                border: 1px solid var(--border-color);
                border-radius: 20px;
                background: var(--surface-color);
                color: var(--text-primary);
                cursor: pointer;
                transition: var(--transition-fast);
                font-size: 0.9rem;
            }

            .related-formula-btn:hover {
                background: var(--primary-color);
                color: white;
            }

            .formula-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }

            .formula-action-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                background: var(--primary-color);
                color: white;
                cursor: pointer;
                transition: var(--transition-fast);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }

            .formula-action-btn:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
            }

            @media (max-width: 768px) {
                .formula-equation {
                    font-size: 1.2rem;
                }
                
                .formula-actions {
                    flex-direction: column;
                }
                
                .formula-action-btn {
                    justify-content: center;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    clearFormulaDetail() {
        const detailContainer = document.getElementById('formula-detail');
        if (detailContainer) {
            detailContainer.innerHTML = `
                <div class="formula-placeholder">
                    <i class="fas fa-book-open"></i>
                    <p>Select a formula to see its details, derivation, and history</p>
                </div>
            `;
        }
    }

    searchFormulas(query) {
        if (!query.trim()) {
            this.displayFormulaList();
            return;
        }

        const allFormulas = [];
        Object.keys(this.formulas).forEach(category => {
            this.formulas[category].forEach(formula => {
                if (this.formulaMatchesQuery(formula, query)) {
                    allFormulas.push({ ...formula, category });
                }
            });
        });

        this.displaySearchResults(allFormulas);
    }

    formulaMatchesQuery(formula, query) {
        const searchText = query.toLowerCase();
        return (
            formula.name.toLowerCase().includes(searchText) ||
            formula.formula.toLowerCase().includes(searchText) ||
            formula.description.toLowerCase().includes(searchText) ||
            formula.applications.some(app => app.toLowerCase().includes(searchText))
        );
    }

    displaySearchResults(results) {
        const formulaList = document.getElementById('formula-list');
        if (!formulaList) return;

        if (results.length === 0) {
            formulaList.innerHTML = '<p>No formulas found matching your search.</p>';
            return;
        }

        formulaList.innerHTML = results.map(formula => `
            <div class="formula-item" data-id="${formula.id}">
                <div class="formula-name">${formula.name} <span class="formula-category">(${formula.category})</span></div>
                <div class="formula-preview">${this.escapeHtml(formula.formula)}</div>
            </div>
        `).join('');

        // Add click listeners
        formulaList.querySelectorAll('.formula-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const formulaId = e.currentTarget.dataset.id;
                this.selectFormula(formulaId);
            });
        });
    }

    // Action methods
    copyFormula(formulaId) {
        const formula = this.findFormulaById(formulaId);
        if (formula) {
            const text = `${formula.name}: ${formula.formula}\n${formula.description}`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification('Formula copied to clipboard', 'success');
                });
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.showNotification('Formula copied to clipboard', 'success');
            }
        }
    }

    addToFavorites(formulaId) {
        let favorites = JSON.parse(localStorage.getItem('formula-favorites') || '[]');
        
        if (!favorites.includes(formulaId)) {
            favorites.push(formulaId);
            localStorage.setItem('formula-favorites', JSON.stringify(favorites));
            this.showNotification('Added to favorites', 'success');
        } else {
            this.showNotification('Already in favorites', 'info');
        }
    }

    calculateExample(formulaId) {
        const formula = this.findFormulaById(formulaId);
        if (formula && formula.example) {
            // Try to extract calculable parts from the example
            this.showNotification('Example calculation shown above', 'info');
            
            // Could be extended to actually perform calculations
            // based on the formula and example values
        }
    }

    showNotification(message, type) {
        if (window.calculatorApp) {
            window.calculatorApp.showNotification(message, type);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export/Import functionality
    exportFormulas() {
        return JSON.stringify(this.formulas, null, 2);
    }

    importFormulas(jsonData) {
        try {
            const importedFormulas = JSON.parse(jsonData);
            // Merge with existing formulas
            Object.keys(importedFormulas).forEach(category => {
                if (this.formulas[category]) {
                    this.formulas[category] = [...this.formulas[category], ...importedFormulas[category]];
                } else {
                    this.formulas[category] = importedFormulas[category];
                }
            });
            
            this.displayFormulaList();
            this.showNotification('Formulas imported successfully', 'success');
            return true;
        } catch (error) {
            this.showNotification('Error importing formulas', 'error');
            return false;
        }
    }

    // Get formula statistics
    getStatistics() {
        const stats = {
            totalFormulas: 0,
            byCategory: {}
        };

        Object.keys(this.formulas).forEach(category => {
            const count = this.formulas[category].length;
            stats.byCategory[category] = count;
            stats.totalFormulas += count;
        });

        return stats;
    }
}

// Initialize formulas manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.formulasManager = new FormulasManager();
});

// Export for use in other modules
window.FormulasManager = FormulasManager;