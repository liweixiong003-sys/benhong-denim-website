document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animation on scroll
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    
    // Initial trigger
    setTimeout(reveal, 100);

    initEChartsMap();
});

// Mobile Navigation Toggle
function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Video Mute Toggle
function toggleVideoMute() {
    const video = document.getElementById('promo-video');
    const muteText = document.getElementById('mute-text');
    const icon = document.querySelector('#video-toggle i');
    
    if (video.muted) {
        video.muted = false;
        muteText.innerText = "静音";
        icon.classList.remove('fa-volume-xmark');
        icon.classList.add('fa-volume-high');
    } else {
        video.muted = true;
        muteText.innerText = "播放声音";
        icon.classList.remove('fa-volume-high');
        icon.classList.add('fa-volume-xmark');
    }
}

// Initialize ECharts Map
function initEChartsMap() {
    const mapContainer = document.getElementById('echarts-map');
    if (!mapContainer) return;

    fetch('assets/world.json')
        .then(response => response.json())
        .then(worldJson => {
            echarts.registerMap('world', worldJson);
            const myChart = echarts.init(mapContainer);

            // Adjust labels with precise offsets to absolutely prevent overlap
            const partnerData = [
                { name: 'RUSSIA\n俄罗斯', value: [90.0, 60.0], label: { position: 'right', offset: [10, 0] } },
                { name: 'GERMANY\n德国', value: [10.4515, 51.1657], label: { position: 'top', offset: [0, -10] } },
                { name: 'FRANCE\n法国', value: [2.2137, 46.2276], label: { position: 'left', offset: [-10, 5] } },
                { name: 'ITALY\n意大利', value: [12.5674, 41.8719], label: { position: 'bottom', offset: [0, 10] } },
                { name: 'POLAND\n波兰', value: [19.1451, 51.9194], label: { position: 'right', offset: [15, -10] } },
                { name: 'NETHERLANDS\n荷兰', value: [5.2913, 52.1326], label: { position: 'left', offset: [-15, -15] } }
            ];

            const premiumGold = '#D4AF37'; // Champagne Gold, much more elegant than pure yellow
            const premiumGoldGlow = 'rgba(212, 175, 55, 0.4)';

            const option = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.seriesType === 'effectScatter') {
                            return params.name.replace('\n', '<br/>');
                        }
                        if (params.name) {
                            return params.name;
                        }
                    },
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    borderColor: premiumGold,
                    borderWidth: 1,
                    padding: [10, 15],
                    textStyle: { color: premiumGold, fontFamily: '"Cinzel", "Noto Sans SC", serif', fontSize: 13, letterSpacing: 1 }
                },
                geo: {
                    map: 'world',
                    roam: false, // Fix the map layout, disallow dragging/zooming
                    zoom: 2.8, // Match the screenshot framing perfectly
                    center: [20, 48], // Match the screenshot framing perfectly
                    itemStyle: {
                        areaColor: '#161616', // Sleek dark grey
                        borderColor: '#2a2a2a', // Subtle boundaries
                        borderWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: '#221e15', // Premium dark gold glow for territory
                            borderColor: premiumGold,
                            borderWidth: 1,
                            shadowColor: premiumGoldGlow,
                            shadowBlur: 15
                        },
                        label: { show: false }
                    }
                },
                series: [
                    {
                        name: 'Partners',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: partnerData,
                        symbolSize: 8,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke',
                            scale: 5
                        },
                        itemStyle: {
                            color: premiumGold,
                            shadowBlur: 15,
                            shadowColor: premiumGold
                        },
                        label: {
                            show: true,
                            formatter: '{b}',
                            color: premiumGold,
                            fontSize: 11,
                            fontFamily: '"Cinzel", "Noto Sans SC", serif',
                            lineHeight: 16,
                            textShadowColor: 'rgba(0, 0, 0, 0.9)',
                            textShadowBlur: 5,
                            textBorderWidth: 0 // Remove thick stroke, rely on shadow for elegance
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 13,
                                fontWeight: 'normal',
                                textShadowBlur: 10
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
            window.addEventListener('resize', () => myChart.resize());
        })
        .catch(error => console.error('Error loading map:', error));
}
