import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Music2, Loader2, Play, ThumbsDown, Volume2, VolumeX, ClipboardCheck } from 'lucide-react';

const REELS_DATA = [
    {
        id: 1,
        username: 'traveler_pro',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        likes: '125K',
        comments: '1.2K',
        description: 'Exploring the hidden gems of the mountains! 🏔️✨ #nature #adventure',
        audio: 'Original Audio - traveler_pro'
    },
    {
        id: 2,
        username: 'chef_master',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        likes: '89K',
        comments: '950',
        description: 'The secret to the perfect chocolate lava cake! 🍫🍩 #baking #foodie',
        audio: 'Chef Master - Cooking Vibes'
    },
    {
        id: 3,
        username: 'tech_guru',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        likes: '45K',
        comments: '320',
        description: 'New setup tour! Rate this 1-10 💻🚀 #setup #productivity',
        audio: 'Lofi Beats - Tech Focus'
    },
    {
        id: 4,
        username: 'fitness_zoom',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        likes: '210K',
        comments: '2.5K',
        description: 'Morning workout routine! 💪🔥 #fitness #motivation',
        audio: 'Energize - Fitness Beats'
    },
    {
        id: 5,
        username: 'nature_lover',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        likes: '67K',
        comments: '430',
        description: 'Peaceful sunset at the beach 🌅🌊 #nature #calm',
        audio: 'Chill Vibes - Nature'
    },
    {
        id: 6,
        username: 'auto_enthusiast',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        likes: '150K',
        comments: '1.8K',
        description: 'Checkout this beast! 🏎️💨 #cars #speed',
        audio: 'Engine Roar - Turbo'
    },
    {
        id: 7,
        username: 'dreamer_01',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        likes: '340K',
        comments: '4.2K',
        description: 'Enter the world of dreams... 🎨✨ #art #surreal',
        audio: 'Dreamscape - Ambient'
    },
    {
        id: 8,
        username: 'bunny_vlogs',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        likes: '1.2M',
        comments: '12K',
        description: 'The big buck is back! 🐰🌳 #cartoon #funny',
        audio: 'Forest Sounds - Happy'
    },
    {
        id: 9,
        username: 'cinema_buff',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        likes: '890K',
        comments: '9K',
        description: 'Epic cinematic shots from Sintel 🎬🐉 #cgi #movie',
        audio: 'Epic Orchestral - Movie'
    },
    {
        id: 10,
        username: 'urban_explorer',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        likes: '560K',
        comments: '6.5K',
        description: 'Cyberpunk vibes in the city 🏙️🤖 #scifi #vfx',
        audio: 'Synthwave - Night City'
    },
    {
        id: 11,
        username: 'ocean_breeze',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        likes: '120K',
        comments: '1.1K',
        description: 'Hit the road! 🏎️💨 #roadtrip #adventure',
        audio: 'Summer Hits - Road'
    },
    {
        id: 12,
        username: 'wildlife_geo',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        likes: '95K',
        comments: '800',
        description: 'Finding the best deals! 🚗💰 #cars #finance',
        audio: 'Business - Talk'
    },
    {
        id: 13,
        username: 'auto_guru',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        likes: '120K',
        comments: '2.1K',
        description: 'GTI Review is here! 🚗🔥 #cars #review',
        audio: 'Auto Talk - Motor'
    },
    {
        id: 14,
        username: 'skater_pro',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: '2M',
        comments: '15K',
        description: 'Insane trick! 🛹🔥 #skate #pro',
        audio: 'Punk Rock - Skate'
    },
    {
        id: 15,
        username: 'zen_garden',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        likes: '45K',
        comments: '300',
        description: 'Relaxing moments 🌿 #meditation #peace',
        audio: 'Calm Piano - Relax'
    },
    {
        id: 16,
        username: 'nature_vibe',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
        likes: '34K',
        comments: '450',
        description: 'Nature and tech collide 🌿🚴 #detection #ai',
        audio: 'Electronic Pulse - Tech'
    },
    {
        id: 17,
        username: 'health_vlog',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/bottle-detection.mp4',
        likes: '12K',
        comments: '200',
        description: 'Hydration is key! 💧✨ #health #tips',
        audio: 'Zen Flow - Health'
    },
    {
        id: 18,
        username: 'city_walk',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking-and-pause.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'City streets never sleep 🏙️🚶 #urban #walking',
        audio: 'Street Jazz - Mood'
    },
    {
        id: 21,
        username: 'ocean_breeze',
        videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
        likes: '780K',
        comments: '5.6K',
        description: 'The beauty of the deep blue 🌊🐬 #ocean #nature',
        audio: 'Sea Shore - Relax'
    },
    {
        id: 22,
        username: 'garden_zen',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        likes: '12K',
        comments: '150',
        description: 'Blooming with positivity! 🌸✨ #flowers #spring',
        audio: 'Nature - Soft'
    },
    {
        id: 23,
        username: 'jelly_fishy',
        videoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4',
        likes: '95K',
        comments: '800',
        description: 'Glow in the dark vibes 🐙✨ #jellyfish #aesthetic',
        audio: 'Deep Sea - Synth'
    },
    {
        id: 24,
        username: 'fast_vibe',
        videoUrl: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
        likes: '34K',
        comments: '400',
        description: 'Fast and curious! 🏎️💨 #speed #vibe',
        audio: 'Upbeat - Drive'
    },
    {
        id: 25,
        username: 'slow_mo',
        videoUrl: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-slow.mp4',
        likes: '56K',
        comments: '600',
        description: 'Take it slow and enjoy the ride 🐌🌈 #chill #slowmo',
        audio: 'Relaxed - LoFi'
    },
    {
        id: 26,
        username: 'cute_patrol',
        videoUrl: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-cute.mp4',
        likes: '2.5M',
        comments: '45K',
        description: 'Warning: Too much cuteness! 🐱❤️ #pets #cute',
        audio: 'Happy - Paws'
    },
    {
        id: 27,
        username: 'highline_pro',
        videoUrl: 'http://clappr.io/highline.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'View from the top! 🏙️☁️ #urban #view',
        audio: 'Street - Jazz'
    },
    {
        id: 28,
        username: 'driver_cam',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/driver-action-recognition-0001.mp4',
        likes: '12K',
        comments: '200',
        description: 'Eyes on the road! 🚗🛣️ #safety #driver',
        audio: 'Engine - Normal'
    },
    {
        id: 29,
        username: 'car_spotter',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4',
        likes: '67K',
        comments: '900',
        description: 'Traffic flow in the city 🏙️🚗 #cars #urban',
        audio: 'City - Traffic'
    },
    {
        id: 46,
        username: 'nature_explorer',
        videoUrl: 'https://file-examples.com/storage/fe349942a46786018449c25/2017/04/file_example_MP4_1920_18MG.mp4',
        likes: '12K',
        comments: '150',
        description: 'Peaceful walks in nature 🌿🚶 #nature #peace',
        audio: 'Forest Sounds - Chill'
    },
    {
        id: 47,
        username: 'wild_nature',
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        likes: '45K',
        comments: '500',
        description: 'Nature at its best 🌳✨ #wildlife #nature',
        audio: 'Nature - Relaxing'
    },
    {
        id: 48,
        username: 'ocean_waves',
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
        likes: '89K',
        comments: '1.2K',
        description: 'Crashing waves on the shore 🌊🏖️ #ocean #beach',
        audio: 'Ocean - Waves'
    },
    {
        id: 49,
        username: 'city_life',
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
        likes: '560K',
        comments: '4.5K',
        description: 'Urban vibes in the night 🏙️✨ #city #night',
        audio: 'City - Lights'
    },
    {
        id: 50,
        username: 'gadget_news',
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
        likes: '23K',
        comments: '300',
        description: 'New gadgets for the year! 📱✨ #tech #gadgets',
        audio: 'Tech - News'
    },
    {
        id: 51,
        username: 'car_lover',
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
        likes: '150K',
        comments: '2.1K',
        description: 'Checkout this luxury car! 🏎️💨 #cars #luxury',
        audio: 'Car - Engine'
    },
    {
        id: 52,
        username: 'space_odyssey',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        likes: '2.5M',
        comments: '50K',
        description: 'Classic bunny vibes 🐰✨ #classic #animation',
        audio: 'Bunny - Theme'
    },
    {
        id: 53,
        username: 'drone_view',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
        likes: '120K',
        comments: '1.5K',
        description: 'Higher quality bunny! 🐰🔥 #drone #view',
        audio: 'Wind - Effects'
    },
    {
        id: 54,
        username: 'urban_pulse',
        videoUrl: 'http://mirrors.standaloneinstaller.com/video-sample/logistics-free-video.mp4',
        likes: '45K',
        comments: '600',
        description: 'Logistics in action 🚛📦 #urban #business',
        audio: 'Urban - Pulse'
    },
    {
        id: 55,
        username: 'tech_demo',
        videoUrl: 'http://mirrors.standaloneinstaller.com/video-sample/DLP_PART_2_720p_30fps.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'Testing the latest display tech 💻✨ #tech #display',
        audio: 'Tech - Demo'
    },
    {
        id: 56,
        username: 'sky_high',
        videoUrl: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
        likes: '23K',
        comments: '400',
        description: 'Clouds in the sky ☁️✨ #sky #nature',
        audio: 'Ambient - Calm'
    },
    {
        id: 57,
        username: 'daily_dose',
        videoUrl: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
        likes: '56K',
        comments: '700',
        description: 'Morning routines are the best! ☀️☕ #daily #vlog',
        audio: 'Coffee - Chill'
    },
    {
        id: 19,
        username: 'nature_vibe',
        videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        likes: '450K',
        comments: '2.3K',
        description: 'Testing the waters... Literally! 🌊🐉 #sintel #cgi',
        audio: 'Aqua - Ambient'
    },
    {
        id: 20,
        username: 'bunny_fan',
        videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
        likes: '1.1M',
        comments: '10K',
        description: 'Big Buck Bunny is always a mood 🐰🥕 #classic #animation',
        audio: 'Happy - Cartoon'
    },
    {
        id: 64,
        username: 'aqua_deep',
        videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
        likes: '780K',
        comments: '5.6K',
        description: 'The beauty of the deep blue 🌊🐬 #ocean #nature',
        audio: 'Sea Shore - Relax'
    },
    {
        id: 65,
        username: 'garden_life',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        likes: '12K',
        comments: '150',
        description: 'Blooming with positivity! 🌸✨ #flowers #spring',
        audio: 'Nature - Soft'
    },
    {
        id: 66,
        username: 'jelly_glow',
        videoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4',
        likes: '95K',
        comments: '800',
        description: 'Glow in the dark vibes 🐙✨ #jellyfish #aesthetic',
        audio: 'Deep Sea - Synth'
    },
    {
        id: 67,
        username: 'mountain_sky',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        likes: '125K',
        comments: '1.2K',
        description: 'Mountain adventures! ⛰️✨ #adventure #nature',
        audio: 'Mountain - Air'
    },
    {
        id: 68,
        username: 'city_night',
        videoUrl: 'http://clappr.io/highline.mp4',
        likes: '150K',
        comments: '2.5K',
        description: 'City neon nights 🏙️✨ #neon #city',
        audio: 'Synthwave - Pulse'
    },
    {
        id: 69,
        username: 'skate_pro_v2',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: '2M',
        comments: '45K',
        description: 'Keep on rolling! 🛹🔥 #skate #vibe',
        audio: 'Punk - Rock'
    },
    {
        id: 70,
        username: 'vibe_check',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
        likes: '34K',
        comments: '450',
        description: 'Traffic and tech 🌿🚴 #ai #detection',
        audio: 'Electronic - Pulse'
    },
    {
        id: 71,
        username: 'health_tips',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/bottle-detection.mp4',
        likes: '12K',
        comments: '200',
        description: 'Stay hydrated! 💧✨ #health #tips',
        audio: 'Zen - Flow'
    },
    {
        id: 72,
        username: 'walk_the_city',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking-and-pause.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'Walking through the city 🏙️🚶 #urban #walk',
        audio: 'Street - Jazz'
    },
    {
        id: 73,
        username: 'sea_breeze',
        videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
        likes: '780K',
        comments: '5.6K',
        description: 'Deep blue beauty 🌊🐬 #ocean #nature',
        audio: 'Sea - Shore'
    },
    {
        id: 74,
        username: 'flower_power',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        likes: '12K',
        comments: '150',
        description: 'Flowers in the spring 🌸✨ #nature #spring',
        audio: 'Nature - Soft'
    },
    {
        id: 75,
        username: 'jelly_dance',
        videoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4',
        likes: '95K',
        comments: '800',
        description: 'Under the sea magic 🐙✨ #jellyfish #aesthetic',
        audio: 'Deep - Synth'
    },
    {
        id: 52,
        username: 'space_odyssey',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        likes: '2.5M',
        comments: '50K',
        description: 'Classic bunny vibes 🐰✨ #classic #animation',
        audio: 'Bunny - Theme'
    },
    {
        id: 53,
        username: 'drone_view',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
        likes: '120K',
        comments: '1.5K',
        description: 'Higher quality bunny! 🐰🔥 #drone #view',
        audio: 'Wind - Effects'
    },
    {
        id: 54,
        username: 'urban_pulse',
        videoUrl: 'http://mirrors.standaloneinstaller.com/video-sample/logistics-free-video.mp4',
        likes: '45K',
        comments: '600',
        description: 'Logistics in action 🚛📦 #urban #business',
        audio: 'Urban - Pulse'
    },
    {
        id: 55,
        username: 'tech_demo',
        videoUrl: 'http://mirrors.standaloneinstaller.com/video-sample/DLP_PART_2_720p_30fps.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'Testing the latest display tech 💻✨ #tech #display',
        audio: 'Tech - Demo'
    },
    {
        id: 56,
        username: 'sky_high',
        videoUrl: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
        likes: '23K',
        comments: '400',
        description: 'Clouds in the sky ☁️✨ #sky #nature',
        audio: 'Ambient - Calm'
    },
    {
        id: 57,
        username: 'daily_dose',
        videoUrl: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
        likes: '56K',
        comments: '700',
        description: 'Morning routines are the best! ☀️☕ #daily #vlog',
        audio: 'Coffee - Chill'
    },
    {
        id: 58,
        username: 'ocean_breeze',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        likes: '34K',
        comments: '450',
        description: 'A quiet moment by the ocean 🌊🧘 #peace #ocean',
        audio: 'Sea - Waves'
    },
    {
        id: 59,
        username: 'macro_world',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        likes: '12K',
        comments: '200',
        description: 'Nature in close-up 🌸✨ #macro #nature',
        audio: 'Soft - Garden'
    },
    {
        id: 60,
        username: 'city_lights',
        videoUrl: 'http://clappr.io/highline.mp4',
        likes: '150K',
        comments: '2.5K',
        description: 'City neon nights 🏙️✨ #neon #city',
        audio: 'Synthwave - Pulse'
    },
    {
        id: 61,
        username: 'skate_vibes',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: '2M',
        comments: '45K',
        description: 'Keep on rolling! 🛹🔥 #skate #vibe',
        audio: 'Punk - Rock'
    },
    {
        id: 62,
        username: 'forest_soul',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'Deep in the heart of the forest 🌲✨ #nature #peace',
        audio: 'Forest - Zen'
    },
    {
        id: 63,
        username: 'speed_tracker',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4',
        likes: '120K',
        comments: '2.1K',
        description: 'Tracking the beast! 🏎️💨 #cars #review',
        audio: 'Engine - Turbo'
    }
];

const POOL_OF_USERNAMES = [
    'pixel_art', 'daily_vlog', 'music_soul', 'gamer_zone', 'creative_mind', 'wanderlust', 'foodie_life', 'tech_insider',
    'style_icon', 'adventure_seeker', 'chef_talk', 'movie_magic', 'retro_gamer', 'health_first', 'urban_pulse', 'sky_high',
    'neon_nights', 'wild_spirit', 'digital_nomad', 'trend_setter', 'soul_surfer', 'zen_master', 'code_ninja', 'data_viz',
    'art_flow', 'urban_vibe', 'mountain_high', 'desert_rose', 'city_slicker', 'rural_life', 'dance_diva', 'beat_boxer',
    'green_thumb', 'cosmic_journey', 'mountain_top', 'desert_wind', 'ocean_wave', 'city_light', 'rural_soul', 'yoga_glow',
    'fit_life', 'skate_boarder', 'bike_rider', 'photo_graphy', 'video_graphy', 'design_thinker', 'ux_ui_pro', 'dev_genius',
    'quantum_coder', 'meta_explorer', 'cyber_artist', 'eco_warrior', 'solar_punk', 'future_focus', 'mindful_living', 'global_nomad',
    'pixel_pusher', 'sound_shaper', 'motion_maker', 'story_teller', 'vision_quest', 'peak_performance', 'daily_grit', 'serene_scenes'
];
const POOL_OF_DESCRIPTIONS = [
    'Check this out! 🚀✨ #amazing #viral',
    'Life is a journey, not a destination. 🌍❤️',
    'POV: You are in paradise 🌴☀️ #paradise #travel',
    'Can you believe this happened? 😲😱 #shook #wow',
    'Best day ever! 🎊🕺 #happy #vibes',
    'Cooking something special today 🥘🔥 #chef #delicious',
    'Wait for the end... 😱👀 #plot-twist',
    'New morning routine revealed ☀️🧘 #lifestyle',
    'Which one is your favorite? 1 or 2? 👇',
    'Transforming my space! 🛠️🏠 #diy #home',
    'Current mood: Grateful ✨🙏 #blessed',
    'Behind the scenes look 🎬👀 #bts #production',
    'Level up your game 🎮🔥 #pro #gaming',
    'The view from the top 🏔️☁️ #mountains #hiking',
    'Friday night vibes 🕺🎶 #weekend #party',
    'Productivity hack you need 💻🚀 #work #efficiency',
    'Nature is healing 🌿💚 #earth #peace',
    'Unboxing the future 📦✨ #tech #new',
    'Street food discovery! 🍜🔥 #food #travel',
    'Morning coffee thoughts ☕️💭 #morning #vibe',
    'Sunsets in the city 🌆✨ #city #view',
    'Gym motivation! 💪😤 #fitness #beast',
    'Drawing my dreams 🎨✨ #art #creativity',
    'Petting my best friend 🐶❤️ #dog #love',
    'Virtual reality is insane! 🕶️🌀 #vr #tech',
    'Coding all night long 💻🌑 #dev #life',
    'Planting some love 🪴💚 #garden #home',
    'Baking therapy 🧁✨ #sweet #baking',
    'Driving into the sunset 🚗🌅 #drive #vibes',
    'Skydiving experience! 🪂💨 #adrenaline #life',
    'Exploring the unknown 🌌✨ #explorer',
    'Mastering the craft 🛠️💪 #skill',
    'A moment of silence 🧘‍♂️✨ #mindfulness',
    'Chasing the light ☀️📸 #photography',
    'Breaking limits every day 🚀💯 #growth'
];

const ReelItem = ({ reel, isFollowed, onToggleFollow, isLikedInitially, onToggleLike, isDislikedInitially, onToggleDislike, isMuted, onToggleMute }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [lastTap, setLastTap] = useState(0);

    const handleTap = (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
            // Double Tap detected
            setShowHeart(true);
            setLiked(true);
            setTimeout(() => setShowHeart(false), 800);
        } else {
            togglePlay();
        }
        setLastTap(now);
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7 // Trigger when 70% of the video is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.play().catch(error => {
                        console.log("Autoplay prevented:", error);
                    });
                    setIsPlaying(true);
                } else if (videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoError = () => {
        console.error("Video failed to load:", reel.videoUrl);
        setHasError(true);
    };

    const [liked, setLiked] = useState(isLikedInitially);
    const [disliked, setDisliked] = useState(isDislikedInitially);
    const [showCopyNotif, setShowCopyNotif] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState('');

    const handleLike = () => {
        if (!liked && disliked) {
            setDisliked(false);
            onToggleDislike();
        }
        setLiked(!liked);
        onToggleLike();
    };

    const handleDislike = () => {
        if (!disliked && liked) {
            setLiked(false);
            onToggleLike();
        }
        setDisliked(!disliked);
        onToggleDislike();
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowCopyNotif(true);
            setTimeout(() => setShowCopyNotif(false), 2000);
        });
    };

    const handleCommentSubmit = (e) => {
        if (e.key === 'Enter' && comment.trim()) {
            setComment('');
            setShowCommentInput(false);
            alert("Comment posted: " + comment);
        }
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            backgroundColor: '#000',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            overflow: 'hidden'
        }}>
            {/* Video Background */}
            {!hasError ? (
                <video
                    ref={videoRef}
                    src={reel.videoUrl}
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={handleTap}
                    onError={handleVideoError}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        cursor: 'pointer'
                    }}
                />
            ) : (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#111',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <p style={{ marginBottom: '10px' }}>Video failed to load</p>
                    <button
                        onClick={() => { setHasError(false); }}
                        style={{
                            background: 'var(--accent-color)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            padding: '8px 16px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Play/Pause Overlay Icon (shows briefly on toggle) */}
            {!isPlaying && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    color: 'rgba(255,255,255,0.7)',
                    pointerEvents: 'none'
                }}>
                    <Play size={64} fill="currentColor" />
                </div>
            )}

            {/* Double Tap Heart Animation */}
            {showHeart && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 4,
                    color: '#ff3040',
                    pointerEvents: 'none',
                    animation: 'heart-pop 0.8s ease-out forwards'
                }}>
                    <Heart size={100} fill="currentColor" />
                </div>
            )}

            {/* Overlay Gradient */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* Shorts Branding */}
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    backgroundColor: '#ff0000',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '8px solid white'
                    }} />
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Shorts</span>
            </div>

            {/* Mute Toggle */}
            <div
                onClick={onToggleMute}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 4,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </div>

            {/* Interaction Buttons (Right Sidebar) */}
            <div style={{
                position: 'absolute',
                right: 12,
                bottom: 80,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                zIndex: 2,
                color: '#fff'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Heart
                        size={30}
                        className="interactive"
                        onClick={handleLike}
                        fill={liked ? "#ff3040" : "none"}
                        color={liked ? "#ff3040" : "#fff"}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>{liked ? 'Liked' : reel.likes}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <ThumbsDown
                        size={30}
                        className="interactive"
                        onClick={handleDislike}
                        fill={disliked ? "#fff" : "none"}
                        color={disliked ? "var(--accent-color)" : "#fff"}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>{disliked ? 'Disliked' : 'Dislike'}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <MessageCircle
                        size={30}
                        className="interactive"
                        onClick={() => setShowCommentInput(!showCommentInput)}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>{reel.comments}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {showCopyNotif ? (
                        <ClipboardCheck size={28} color="#4ade80" />
                    ) : (
                        <Send size={28} className="interactive" onClick={handleShare} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
                    )}
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>Share</p>
                </div>
                <MoreHorizontal size={28} className="interactive" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </div>

            {/* Comment Input Overlay */}
            {showCommentInput && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    zIndex: 5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleCommentSubmit}
                        style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            color: '#fff',
                            padding: '8px 16px',
                            outline: 'none'
                        }}
                    />
                </div>
            )}

            {/* Reel Info (Bottom Left) */}
            <div style={{
                padding: '16px',
                zIndex: 2,
                color: '#fff',
                marginBottom: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--story-gradient)',
                        padding: '2px'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: '#222',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            {reel.username[0].toUpperCase()}
                        </div>
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{reel.username}</span>
                    <button
                        onClick={() => onToggleFollow(reel.username)}
                        style={{
                            background: isFollowed ? 'rgba(255,255,255,0.2)' : 'transparent',
                            border: '1px solid #fff',
                            borderRadius: '6px',
                            color: '#fff',
                            padding: '4px 12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
                </div>

                <p style={{
                    margin: '0 0 12px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    maxHeight: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {reel.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Music2 size={14} />
                    <div className="scroll-text" style={{ fontSize: '12px', fontWeight: '500' }}>
                        {reel.audio}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Reels = () => {
    const [reels, setReels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [seenVideoUrls, setSeenVideoUrls] = useState(new Set());
    const [followedUsers, setFollowedUsers] = useState(new Set());
    const [likedUrls, setLikedUrls] = useState(new Set());
    const [dislikedUrls, setDislikedUrls] = useState(new Set());
    const [isMuted, setIsMuted] = useState(true);
    const scrollContainerRef = useRef(null);

    // Initial Load from LocalStorage and Setup Initial Reels
    useEffect(() => {
        const savedFollows = localStorage.getItem('followedUsers');
        if (savedFollows) setFollowedUsers(new Set(JSON.parse(savedFollows)));

        const savedLikes = localStorage.getItem('likedUrls');
        if (savedLikes) setLikedUrls(new Set(JSON.parse(savedLikes)));

        const savedDislikes = localStorage.getItem('dislikedUrls');
        if (savedDislikes) setDislikedUrls(new Set(JSON.parse(savedDislikes)));

        const savedMute = localStorage.getItem('isMuted');
        if (savedMute !== null) setIsMuted(JSON.parse(savedMute));

        const savedSeen = localStorage.getItem('seenVideoUrls');
        const seenSet = savedSeen ? new Set(JSON.parse(savedSeen)) : new Set();
        setSeenVideoUrls(seenSet);

        // Find videos we haven't seen yet
        let availableVideos = REELS_DATA.filter(r => !seenSet.has(r.videoUrl));

        // If we've seen everything, we switch to "Synthetic Mode" immediately
        const isSyntheticStart = availableVideos.length === 0;
        const sourcePool = isSyntheticStart ? REELS_DATA : availableVideos;

        // Load first 5 reels to start with
        const initialBatch = [...sourcePool].sort(() => Math.random() - 0.5).slice(0, 5).map(r => {
            const randomUsername = POOL_OF_USERNAMES[Math.floor(Math.random() * POOL_OF_USERNAMES.length)];
            const randomDescription = POOL_OF_DESCRIPTIONS[Math.floor(Math.random() * POOL_OF_DESCRIPTIONS.length)];

            return {
                ...r,
                id: `reel-${Date.now()}-${Math.random()}`,
                // If in synthetic mode (all unique videos seen), randomize even the first batch
                ...(isSyntheticStart ? {
                    username: randomUsername,
                    description: randomDescription,
                    likes: (Math.floor(Math.random() * 500) + 10) + 'K',
                    comments: Math.floor(Math.random() * 2000) + 50,
                    audio: `Original Audio - ${randomUsername}`
                } : {})
            };
        });

        setReels(initialBatch);

        // Add those to seen if not in synthetic mode
        if (!isSyntheticStart) {
            initialBatch.forEach(r => seenSet.add(r.videoUrl));
            setSeenVideoUrls(new Set(seenSet));
        }
    }, []);

    // Sync Follows
    useEffect(() => {
        localStorage.setItem('followedUsers', JSON.stringify(Array.from(followedUsers)));
    }, [followedUsers]);

    // Sync Likes
    useEffect(() => {
        localStorage.setItem('likedUrls', JSON.stringify(Array.from(likedUrls)));
    }, [likedUrls]);

    // Sync Dislikes
    useEffect(() => {
        localStorage.setItem('dislikedUrls', JSON.stringify(Array.from(dislikedUrls)));
    }, [dislikedUrls]);

    // Sync Seen List
    useEffect(() => {
        localStorage.setItem('seenVideoUrls', JSON.stringify(Array.from(seenVideoUrls)));
    }, [seenVideoUrls]);

    // Sync Mute
    useEffect(() => {
        localStorage.setItem('isMuted', JSON.stringify(isMuted));
    }, [isMuted]);

    const toggleFollow = (username) => {
        setFollowedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(username)) newSet.delete(username);
            else newSet.add(username);
            return newSet;
        });
    };

    const toggleLike = (videoUrl) => {
        setLikedUrls(prev => {
            const newSet = new Set(prev);
            if (newSet.has(videoUrl)) newSet.delete(videoUrl);
            else {
                newSet.add(videoUrl);
                // If liked, remove from dislikes
                setDislikedUrls(curr => {
                    const dSet = new Set(curr);
                    dSet.delete(videoUrl);
                    return dSet;
                });
            }
            return newSet;
        });
    };

    const toggleDislike = (videoUrl) => {
        setDislikedUrls(prev => {
            const newSet = new Set(prev);
            if (newSet.has(videoUrl)) newSet.delete(videoUrl);
            else {
                newSet.add(videoUrl);
                // If disliked, remove from likes
                setLikedUrls(curr => {
                    const lSet = new Set(curr);
                    lSet.delete(videoUrl);
                    return lSet;
                });
            }
            return newSet;
        });
    };

    const toggleGlobalMute = () => {
        setIsMuted(!isMuted);
    };

    const loadMoreReels = () => {
        if (isLoading) return;

        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // Get videos not yet seen in context of unique initial pool
            let availableVideos = REELS_DATA.filter(r => !seenVideoUrls.has(r.videoUrl));

            // If we've seen all unique videos, we transition to "Unlimited Synthetic" mode
            // where we reuse videos but combine them with fresh random metadata
            let isSyntheticMode = false;
            if (availableVideos.length === 0) {
                availableVideos = REELS_DATA;
                isSyntheticMode = true;
            }

            // Shuffle available videos
            availableVideos = [...availableVideos].sort(() => Math.random() - 0.5);

            const nextBatch = availableVideos.slice(0, 5).map((randomReelTemplate) => {
                // If not in synthetic mode, track as seen
                if (!isSyntheticMode) {
                    setSeenVideoUrls(prev => {
                        const next = new Set(prev);
                        next.add(randomReelTemplate.videoUrl);
                        return next;
                    });
                }

                const randomUsername = POOL_OF_USERNAMES[Math.floor(Math.random() * POOL_OF_USERNAMES.length)];
                const randomDescription = POOL_OF_DESCRIPTIONS[Math.floor(Math.random() * POOL_OF_DESCRIPTIONS.length)];

                // Generate a unique ID to prevent React key issues even if video URL is reused
                return {
                    ...randomReelTemplate,
                    id: `reel-${Date.now()}-${Math.random()}`,
                    username: randomUsername,
                    description: randomDescription,
                    likes: (Math.floor(Math.random() * 500) + 10) + 'K',
                    comments: Math.floor(Math.random() * 2000) + 50,
                    audio: `Original Audio - ${randomUsername}`
                };
            });

            setReels(prev => [...prev, ...nextBatch]);
            setIsLoading(false);
        }, 800);
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // Trigger proactively when user is within 1.5 screen lengths of the bottom
        // This ensures "fetching" happens before they even see it
        if (scrollHeight - scrollTop <= clientHeight * 2.5) {
            loadMoreReels();
        }
    };

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="scroll-hide"
            style={{
                height: 'calc(100vh - 120px)', // Adjusting for header and footer
                width: '100%',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                backgroundColor: '#000',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            {reels.map(reel => (
                <ReelItem
                    key={reel.id}
                    reel={reel}
                    isFollowed={followedUsers.has(reel.username)}
                    onToggleFollow={toggleFollow}
                    isLikedInitially={likedUrls.has(reel.videoUrl)}
                    onToggleLike={() => toggleLike(reel.videoUrl)}
                    isDislikedInitially={dislikedUrls.has(reel.videoUrl)}
                    onToggleDislike={() => toggleDislike(reel.videoUrl)}
                    isMuted={isMuted}
                    onToggleMute={toggleGlobalMute}
                />
            ))}

            {isLoading && (
                <div style={{
                    height: '100px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    scrollSnapAlign: 'end'
                }}>
                    <Loader2 size={24} className="animate-spin" />
                </div>
            )}

            <style>{`
                .scroll-hide::-webkit-scrollbar {
                    display: none;
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes heart-pop {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Reels;
