import { GoRandom } from './main2';


document.getElementById('lenzo').addEventListener('click', openLenzo)
document.getElementById('opous').addEventListener('click', openOpous)
document.getElementById('de').addEventListener('click', openDeCuple)
document.getElementById('faxen').addEventListener('click', openFaxen)
document.getElementById('win').addEventListener('click', openWin)



function openLenzo() {

      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'Lenzo DeFi';
      document.getElementById('des-text').innerHTML = 'Lenzo is a DeFi platform where the token "LENZ" would be managed.';
      $("#des-card").toggle(900);
}

function openOpous() {

      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'Opous GameFi';
      document.getElementById('des-text').innerHTML = 'Opous is a Decenteralized game platform. Its a multi genere exciting game.';
      $("#des-card").toggle(900);
}

function openDeCuple() {

      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'DeCuple NFTs';
      document.getElementById('des-text').innerHTML = 'DeCuple is an amazing NFT Marketplace where you can take buy, stake, and lots of other actions with NFTs';
      $("#des-card").toggle(900);
}