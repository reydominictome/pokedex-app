export const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'normal': return 'rgba(159,161,159,1)';
        case 'fighting': return 'rgba(255,128,0,1)';
        case 'flying': return 'rgba(129,185,239,1)';
        case 'poison': return 'rgba(145,65,203,1)';
        case 'ground': return 'rgba(145,81,33,1)';
        case 'rock': return 'rgba(175,169,129,1)';
        case 'bug': return 'rgba(145,161,25,1)';
        case 'ghost': return 'rgba(112,65,112,1)';
        case 'steel': return 'rgba(96,161,184,1)';
        case 'fire': return 'rgba(230,40,41,1)';
        case 'water': return 'rgba(41,128,239,1)';
        case 'grass': return 'rgba(63,161,41,1)';
        case 'electric': return 'rgba(250,192,0,1)';
        case 'psychic': return 'rgba(239,65,121,1)';
        case 'ice': return 'rgba(61,206,243,1)';
        case 'dragon': return 'rgba(80,96,225,1)';
        case 'dark': return 'rgba(98,77,78,1)';
        case 'fairy': return 'rgba(239,112,239,1)';
        default: return 'rgba(0,0,0,1)'; // Default color (black) if type is not found
    }
};
