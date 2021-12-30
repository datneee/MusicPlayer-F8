const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const PLAYER_STORAGE = "DATNE";


const player = $('.player')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const audio = $('#audio')
const playlist = $('.playlist')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const next = $('.btn-next')
const prev = $('.btn-prev')
const random = $('.btn-random')
const repeat = $('.btn-repeat')
const app = {
    // propreties
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE)) || {},
    //  list music
    songs: [{
            name: "Đế vương",
            singer: "Đình Dũng ACV",
            path: "https://aredir.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=mLlbfBZmxofMu33V6AhesQ&e=1640738281",
            image: "https://nhachaymp3.net/icon_baihat/2021/12/11/de-vuong-dinh-dung-acv.png"
        },
        {
            name: "Bước qua nhau",
            singer: "Vũ",
            path: "https://aredir.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=9YQ00uBBtnXjmXUXzfv3Dw&e=1640772916",
            image: "https://nhachaymp3.net/icon_baihat/2021/11/18/ca-nhac-buoc-qua-nhau-vu.png"
        },
        {
            name: "Ái Nộ",
            singer: "Masew, Khôi Vũ",
            path: "https://aredir.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=XzIt5_gV624G7TMZQDjqpQ&e=1640911163",
            image: "https://nhachaymp3.net/icon_baihat/2021/09/02/nhac-mp3-ai-no-masew-khoi-vu.png"

        },
        {
            name: "Biết tìm đâu",
            singer: "Tuấn Hưng",
            path: "https://aredir.nixcdn.com/NhacCuaTui180/BietTimDau-TuanHung_3c5en.mp3?st=vA43qbb-EymmnyH-HQulEQ&e=1640921450",
            image: "https://nhachaymp3.net/icon_baihat/2018/08/04/nhac-mp3-biet-tim-dau-tuan-hung.png"
        },
        {
            name: "At my worst",
            singer: "Pink Sweat",
            path: "https://aredir.nixcdn.com/Warner_Audio56/AtMyWorst-PinkSweat-6704978.mp3?st=-or26bFCwHYjiPR2CUnCuA&e=1640921669",
            image: "https://nhachaymp3.net/icon_baihat/2020/12/04/ca-nhac-mp3-at-my-worst-pink-sweat.png"
        },
        {
            name: "Memories",
            singer: "Maroon 5",
            path: "https://aredir.nixcdn.com/Unv_Audio149/Memories-Maroon5-6091839.mp3?st=LqddGsl6hCN6htSTsQzydQ&e=1640921763",
            image: "https://nhachaymp3.net/icon_baihat/2019/09/24/nghe-nhac-memories-maroon-5.png"
        },
        {
            name: "Girls Like You",
            singer: "Maroon 5, Cardi B",
            path: "https://aredir.nixcdn.com/Unv_Audio91/GirlsLikeYou-Maroon5CardiB-5519390.mp3?st=GqfpuTdSgN2XvCGHOISCfw&e=1640921882",
            image: "https://nhachaymp3.net/icon_baihat/2018/08/02/nhac-hay-girls-like-you-maroon-5-cardi-b.png"
        },
        {
            name: "Christmas Eve",
            singer: "Justin Bieber",
            path: "https://aredir.nixcdn.com/Unv_Audio23/ChristmasEve-JustinBieber-3359884.mp3?st=HsmC1ISjdUDxqbbq0ylXbg&e=1640922192",
            image: "https://nhachaymp3.net/icon_baihat/2021/12/30/nghe-bai-hat-christmas-eve-justin-bieber.png"
        },
        {
            name: "All I Want For Christmas Is You",
            singer: "Mariah Carey",
            path: "https://aredir.nixcdn.com/Sony_Audio1/AllIWantForChristmasIsYou_MariahC_5hr.mp3?st=Y0548KGFKWuJID8IhsPwHw&e=1640922525",
            image: "https://nhachaymp3.net/icon_baihat/2018/10/10/bai-hat-all-i-want-for-christmas-is-you-mariah-carey.png"
        },
        {
            name: "Thunder",
            singer: "Gabry Ponte, LUM!X, Prezioso",
            path: "https://aredir.nixcdn.com/NhacCuaTui1021/Thunder-GabryPonteLUMXPrezioso-7087951.mp3?st=9g4lALeTDAhJngGz_PcPVg&e=1640922625",
            image: "https://nhachaymp3.net/icon_baihat/2021/09/28/ca-nhac-thunder-gabry-ponte-lum-x-prezioso.png"
        },
        {
            name: "Peaches",
            singer: "Justin Bieber, Daniel Caesar, Giveon",
            path: "https://aredir.nixcdn.com/Unv_Audio197/Peaches-JustinBieberDanielCaesarGiveon-6993755.mp3?st=SvBioAFEsulHbzUicMJ-bg&e=1640922711",
            image: "https://nhachaymp3.net/icon_baihat/2021/06/09/nghe-nhac-peaches-justin-bieber-daniel-caesar-giveon.png"
        },
        {
            name: "Unstoppable",
            singer: "Sia",
            path: "https://aredir.nixcdn.com/NhacCuaTui915/Unstoppable-Sia-4312901.mp3?st=J8I2dGFed4NHsryr79eKCg&e=1640922805",
            image: "https://nhachaymp3.net/icon_baihat/2018/08/05/bai-hat-unstoppable-sia.png"
        },
        {
            name: "Có hẹn với thanh xuân",
            singer: "MONSTAR",
            path: "https://aredir.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=-ZT9T9VxEz6ps5oksGvMHw&e=1640922850",
            image: "https://nhachaymp3.net/icon_baihat/2021/07/22/nghe-ca-nhac-co-hen-voi-thanh-xuan-monstar.png"
        },
        {
            name: "Thức Giấc",
            singer: "Da LAB",
            path: "https://aredir.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=DzxJL4lPPrCWFT3cuu877Q&e=1640922920",
            image: "https://nhachaymp3.net/icon_baihat/2021/07/16/thuc-giac-da-lab.png"
        },
        {
            name: "Tiny Love",
            singer: "Thịnh Suy",
            path: "https://aredir.nixcdn.com/NhacCuaTui1024/TinyLove-ThinhSuy-7122314.mp3?st=zQFJrhBZYMNbXz0_4CuxGw&e=1640906334",
            image: "https://nhachaymp3.net/icon_baihat/2021/12/28/ca-nhac-mp3-tiny-love-thinh-suy.png"
        },
        {
            name: "Title",
            singer: "Meghan Trainor",
            path: "https://aredir.nixcdn.com/NhacCuaTui870/Title-MeghanTrainor-3505613.mp3?st=dM0IqqXrwls7WH1dKKcXoA&e=1640923026",
            image: "https://nhachaymp3.net/icon_baihat/2018/10/15/nhac-mp3-title-meghan-trainor.png"
        },
        {
            name: "Lucky",
            singer: "Lucky Twice",
            path: "https://aredir.nixcdn.com/NhacCuaTui035/Lucky-LuckyTwice_5umy.mp3?st=xRiVk9HxQ94PB7FHt3GruQ&e=1640860999",
            image: "https://nhachaymp3.net/icon_baihat/2018/08/04/nghe-nhac-lucky-lucky-twice.png"
        },
        {
            name: "That Girl",
            singer: "Olly Murs",
            path: "https://aredir.nixcdn.com/Sony_Audio83/ThatGirl-OllyMurs-6560207.mp3?st=ZAmEiUYnDUaPpYTzjwfw_A&e=1640923167",
            image: "https://nhachaymp3.net/icon_baihat/2018/08/02/nhac-hay-that-girl-olly-murs.png"
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div data-index = "${index}" class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">

                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('\n')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        // xử lí scroll 
        const cdWidth = cd.offsetWidth
        document.onscroll = function(e) {
                const scroollTop = window.scrollTop || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scroollTop

                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }
            // xử lí CD quay 
        const cdThumbAnimate = thumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // quay trong 10 giây
            iterations: Infinity, // loop
        })
        cdThumbAnimate.pause()
            // xử lí khi click play
        playBtn.onclick = () => {
            if (this.isPlaying) {
                audio.pause()

            } else {
                audio.play()
            }
        }

        // khi play 
        audio.onplay = () => {
                cdThumbAnimate.play()
                this.isPlaying = true
                player.classList.add('playing')
            }
            // khi pause
        audio.onpause = () => {
                cdThumbAnimate.pause()
                this.isPlaying = false
                player.classList.remove('playing')
            }
            // thay đổi tiến độ timeline 
        audio.ontimeupdate = () => {
                if (audio.duration) {
                    const percent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = percent

                }
            }
            // xử lí khi tua 
        progress.onchange = (e) => {
                const seekTime = e.target.value / 100 * audio.duration
                audio.currentTime = seekTime
            }
            // khi bấm next song 
        next.onclick = (e) => {
                if (this.isRandom) {
                    this.randomSong()
                } else {
                    this.nextSong()
                }
                audio.play()
                this.render()
                this.scrollToActive()
            }
            // khi prev song 
        prev.onclick = (e) => {
                if (this.isRandom) {
                    this.randomSong()
                } else {
                    this.prevSong()

                }
                audio.play()
                this.render()
            }
            // click nút random
        random.onclick = (e) => {
                this.isRandom = !this.isRandom;
                this.setConfig('isRandom', this.isRandom)
                random.classList.toggle('active', this.isRandom)
            }
            // xử lí next song khi end song
        audio.onended = () => {
                if (this.isRepeat) {
                    audio.play()
                } else
                    next.click()
            }
            // click repeat button
        repeat.onclick = () => {
                this.isRepeat = !this.isRepeat;
                this.setConfig('isRepeat', this.isRepeat);
                repeat.classList.toggle('active', this.isRepeat)
            }
            // click vào bài hát...
        playlist.onclick = (e) => {
            const songEle = e.target.closest('.song:not(.active)')
            if (e.target.closest('.song:not(.active)') || e.target.closest('.option')) {
                if (songEle) {
                    this.currentIndex = Number(songEle.dataset.index);
                    this.loadCurrentSong()
                    audio.play()
                    this.render()
                }
            }
        }
    },
    scrollToActive: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 500)
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        thumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        random.classList.toggle('active', this.isRandom)
        repeat.classList.toggle('active', this.isRepeat)
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong();

    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },
    start: function() {
        // load config
        this.loadConfig()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }

}
app.start()