import React from 'react'
import playstationImg from "../../public/playstation.jpg";
import xbox from "../../public/x-box.png";
import nintendo from "../../public/nintendo.png";

export default function SignIn() {
    return (
        <div>
            <div>
                <h1>Epic games'e giriş yap</h1>
            </div>
            <div>
                <div>
                    <p>Sadece konsoldamı oynadın? İlerleme durumlarına ve satın alımlar için giriş yap.</p>
                    <a href="" class="w-[430px]">
                        <img src={playstationImg} alt="Playstation" class="w-[40px] h-[40px]" />
                    </a>
                    <a href="" class="w-[430px]">
                        <img src={xbox} alt="xbox-logo" class="w-[40px] h-[40px]" />
                    </a>
                    <a href="" class="">
                        <img src={nintendo} alt="nintendo" class="w-[40px] h-[40px]" />
                    </a>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div></div>


        </div>
    )
}
