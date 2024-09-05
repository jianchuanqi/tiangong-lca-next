import { supabase } from '@/services/supabase';
import { FunctionRegion } from '@supabase/supabase-js';

export async function hybrid_search() {
  const { data } = await supabase.rpc('hybrid_search', {
    filter_condition: {},
    query_text: '(废钢) OR (scrap steel) OR (steel scrap)',
    query_embedding:
      '[0.031071916,0.009609586,-0.0062794625,-0.058211382,0.018000664,0.0059713745,-0.05776829,-0.008432619,-0.042010784,-0.021573104,0.067737885,-0.066076286,-0.0015257294,0.0066429377,0.08219381,0.067460954,0.02723639,-0.01876223,-0.019053012,0.0008446466,0.021185398,0.016269831,0.03644442,-0.0121919885,-0.024259357,0.014386686,0.04264773,-0.03899221,-0.019523798,-0.0076502827,-0.045832463,-0.041124597,0.006636014,-0.0067294794,0.007684899,0.032539662,0.03566901,-0.0072487295,0.010661933,-0.028911836,-0.018817618,0.033231996,-0.0029406855,0.043035436,0.0539743,-0.016145213,0.009484965,-0.038549118,0.034644358,0.04455857,0.029853411,-0.04264773,0.0068194824,0.030545743,-0.037358303,-0.015231332,-0.020728458,0.007532586,-0.010571929,-0.0061894595,-0.02806719,-0.04616478,0.046497103,0.0028368356,-0.032456584,0.009865749,-0.010807322,0.053780448,-0.025020923,0.011527349,-0.03187502,-0.024536291,0.0035551314,-0.038715277,0.017737579,-0.015245179,-0.011991212,0.066408604,0.04730021,0.007636436,-0.020133052,-0.017169865,-0.0036174413,0.017128324,-0.03685982,-0.060426846,0.003463397,-0.0037732164,0.059706822,0.005320581,-0.07216882,-0.0098934425,-0.023123931,0.030988837,0.025256317,0.070119515,-0.06546703,-0.006172151,0.010087295,0.022348518,0.008238765,-0.06480239,0.009235726,-0.021019237,-0.015895972,-0.0008256074,-0.014165139,-0.0019766116,-0.019329945,0.0075048925,0.045001663,-0.06208845,-0.02299931,0.042952355,0.0058675245,0.0043824697,-0.0074356594,0.0071310326,0.019883811,0.039878394,0.027762564,0.04522321,-0.059762206,-0.03475513,-0.009034949,0.012725085,0.0014236103,-0.019066857,0.017405258,-0.010440386,-0.016976012,-0.009810362,0.018180672,-0.011707355,0.009041873,-0.00020077665,-0.05372506,-0.019163786,-0.024605524,0.02707023,0.022916231,-0.005663286,-0.044087783,-0.004088228,-0.014691312,-0.016962165,0.0044067013,0.010938865,0.009401886,0.037718315,0.030490357,-0.0106896255,-0.017986817,0.02428705,0.03752446,-0.030185731,0.019593032,-0.012524309,-0.008647243,-0.023982424,0.007262576,-0.0017316985,-0.03151501,-0.017668344,0.020368444,0.03140424,-0.02835797,-0.023387017,-0.03140424,0.03968454,-0.020105358,-0.014968245,-0.016131366,-0.016768312,-0.03699829,-0.008861866,0.07322117,-0.010724242,0.003766293,0.028801063,0.0005949739,0.022514679,-0.052091155,-0.03533669,0.0011241761,0.023968577,0.03890913,-0.025560943,-0.019149939,0.08452004,-0.0013889936,-0.015646731,-0.0014616885,-0.03791217,0.045029357,-0.0023418174,0.021019237,0.025408631,0.003568978,0.036804438,0.011208875,0.02058999,-0.013403572,0.011118872,-0.08136301,0.02578249,-0.006556396,0.001364762,0.024979385,-0.014774391,0.020216132,0.05926373,-0.03043497,0.041623075,0.014732852,-0.005507511,0.08285844,0.041623075,0.03201349,0.005362121,-0.013867435,-0.017280638,-0.0025131698,0.029853411,0.040432263,0.02353933,0.05571898,-0.015314411,0.03193041,-0.04034918,-0.039795317,0.003922068,-0.038881436,0.004950183,-0.0040397644,0.05195269,-0.06967642,-0.024383977,0.020354599,-0.0012738932,-0.0055317427,-0.014414378,0.0494049,-0.0055248193,-0.014954398,0.03292737,-0.015812892,0.014317452,0.020742305,0.035641316,0.027970264,0.0025997113,0.005258271,-0.023511637,-0.013812048,0.010668855,-0.015951358,0.004036303,0.017806811,-0.013071252,0.007065261,-0.0077125924,-0.03508745,0.0008359924,0.015771352,0.024965538,0.028579516,0.001462554,0.027291777,-0.016131366,-0.020673072,0.046690956,0.044946276,-0.019869965,-0.03469974,-0.027637944,0.019980738,-0.014400532,0.040183023,0.015812892,0.011949672,-0.039213754,-0.021822345,-0.026280971,-0.007927216,0.0064906245,0.012614312,0.02810873,0.06657477,-0.0071656494,-0.025394784,-0.03492129,0.0048082545,-0.04533398,0.044641647,0.0024214357,0.016366757,-0.011381959,-0.020146897,-0.05535897,-0.011520426,0.018831465,0.030379584,-0.0071725724,-0.016172905,0.005974836,-0.007996449,-0.06480239,-0.016463686,-0.014040519,-0.008550316,-0.0068298676,-0.04159538,-0.04414317,0.009526506,0.005926373,0.0008545989,0.032290425,-0.008778785,-0.04081997,0.055497434,0.0053967377,0.037552156,0.0004582381,0.018914545,-0.012974326,-0.0016295795,0.004950183,0.014165139,-0.015342105,-0.04040457,-0.0037316764,0.020465372,0.0052859643,0.03301045,-0.019191477,0.002989149,0.015882125,-0.026017884,-0.017031398,-0.021379251,-0.014857472,-0.052700408,0.0035862862,-0.009962676,0.004126306,0.03727522,0.0068852543,-0.0025391323,0.021282325,0.04472473,0.027305624,-0.019565338,-0.035945944,0.008488006,-0.0025685565,-0.023996271,0.025131697,0.03060113,0.035142835,0.05020801,0.022819305,-0.0012522578,-0.023677798,0.010239609,0.044281635,-0.042010784,0.034145877,0.023594718,-0.010544236,-0.0016373681,0.006629091,-0.010211916,-0.035945944,0.014248218,0.010440386,0.019731497,0.03159809,0.0710057,-0.032816596,0.050346475,-0.013327415,-0.029493397,-0.03375817,0.020271517,0.03541977,0.006182536,0.06086994,-0.023345478,0.009242649,0.020673072,-0.031542704,0.015231332,-0.0034772437,0.028385663,-0.034616664,-0.028177964,0.0120258285,-0.018111438,-0.0004095584,-0.0007442583,0.035696704,-0.03292737,-0.044364717,0.020451525,0.047521755,0.009831132,0.022597758,0.031210383,-0.10307457,0.02657175,-0.044890888,0.040930744,0.07748594,-0.015009785,-0.06203306,0.038022943,0.022625452,-0.07416274,-0.00037883612,-0.03093345,0.009311883,0.009166492,0.023594718,0.045693994,0.023816265,-0.0013751469,-0.009519583,0.007906446,-0.058654476,0.023843957,0.0010757128,0.027804105,0.07438429,0.011021946,-0.015951358,0.0060336846,0.039186064,0.0010393653,-0.02657175,0.020119205,-0.0007767114,0.0076018195,0.021102319,-0.046330944,-0.016657539,0.02457783,0.012275069,-0.056522086,-0.011174259,0.029991876,0.0045590145,-0.013085099,-0.031542704,0.009464196,-0.06829175,-0.00011044879,0.0056875176,0.04098613,0.021033084,0.07610127,0.022445444,0.017308332,0.03060113,0.020216132,-0.048131008,0.001929879,0.011340419,0.0065079327,-0.025436325,-0.022846997,0.043700077,-0.037358303,0.020160744,0.008889559,0.01734987,0.02785949,-0.012254299,0.00028623652,-0.07117186,-0.043700077,-0.024716297,-0.013403572,-0.021614645,0.0110496385,0.09039103,-0.018582225,0.002966648,-0.03600133,0.025076311,0.004919028,0.022043891,0.03317661,-0.015771352,0.0031085764,-0.035613623,-0.015203639,-0.044281635,-0.003132808,-0.0083910795,-0.03899221,-0.015466725,-0.0026499056,0.011465039,0.006016376,0.0018104515,-0.041041516,0.018554531,0.038521424,-0.029465703,0.051232662,0.05630054,0.03093345,-0.009083413,0.044447795,-0.019371485,-0.02104693,0.0051924996,0.019565338,-0.0040709195,0.03010265,-0.025325552,0.018180672,-0.021365404,-0.0053136577,-0.0025633639,-0.013396649,-0.10639778,0.00053396204,0.023525484,0.025339397,-0.03325969,0.011416576,0.023857804,0.010537312,-0.019066857,-0.031985797,-0.019537644,-0.0013327416,0.0060959943,0.028662598,0.005915988,-0.00040263505,-0.010835015,-0.013611272,0.03807833,0.01917763,-0.019357638,-0.010980406,0.010724242,0.009194186,-0.007664129,0.0074010426,-0.018014511,0.045970928,0.03400741,0.021310018,-0.0120119825,-0.011852746,-0.010177299,0.02603173,0.0057844445,-0.007034106,0.00040133693,0.017751426,0.025644025,0.013812048,0.0014530345,0.0035585929,-0.0060336846,0.0103296125,-0.009048795,0.016311372,-0.06336234,-0.009221879,0.018042205,-0.0074702757,-0.010191145,0.0062794625,-0.0017619882,-0.029493397,-0.053503513,-0.0021721956,-0.02254237,-0.014635925,0.037385996,-0.0055144345,0.009104182,0.020396138,-0.0058848327,-0.0055525126,0.015259025,-0.010495773,-0.025311705,-0.0008035393,0.018416066,-0.010571929,0.047438674,-0.03727522,-0.003215888,-0.018208364,-0.020077664,-0.00069579494,-0.013064329,0.0054175076,-0.0042993897,0.018582225,-0.015660578,0.009166492,0.0009960944,0.02308239,0.04051534,0.0017966048,-0.03400741,0.025810184,-0.012115832,-0.035696704,0.000426434,-0.027097924,-0.010523465,-0.022625452,-0.013272028,0.016892932,0.0012055252,-0.016228292,-0.016214445,0.017460644,-0.02245929,-0.021656185,0.053918913,-0.015134405,-0.013666659,0.0024439364,0.0019489181,-0.034145877,0.020562299,0.036970597,0.009519583,-0.010218839,0.019149939,-0.0025252856,-0.023774724,0.03292737,-0.025325552,0.046746343,0.012060446,-0.022791611,0.028441051,0.0008831576,0.04142922,0.031127304,0.0020596914,-0.01896993,-0.020659225,0.009464196,-0.0059367577,-0.03317661,-0.017834505,-0.027457938,0.015979052,-0.013555885,0.03425665,-0.019440718,-0.0043928544,0.0039359145,0.045832463,0.009436502,0.012392766,0.005711749,0.0095472755,0.02582403,0.032622743,-0.032982755,-0.021296171,0.03616749,-0.015840584,-0.008882636,-0.012766626,0.0113058025,0.03666597,-0.016020592,-0.004680173,-0.032650437,-0.013237412,-0.028441051,-0.020036126,0.0010713857,0.018069899,0.010973482,0.029659556,-0.042453874,-0.030961143,0.026585598,0.011229645,0.0030099188,-0.007698746,0.014677465,0.0063106176,-0.005002108,-0.014137445,0.019053012,-0.015189792,0.009602662,-0.045832463,-0.036029022,-0.023220858,-0.007096416,-0.016145213,0.045721687,0.022902384,0.05239578,-0.018388372,-0.037109062,-0.019814579,-0.014649772,0.039296836,-0.010765783,0.0030116497,0.021019237,-0.0072348826,-0.011748895,-0.0016330411,-0.028288737,-0.023608563,-0.027707176,-0.0024145122,-0.010862709,0.0064248526,-0.019316098,0.015729811,0.015882125,-0.0004803062,-0.0036485964,0.020243825,-0.0077056694,-0.019149939,-0.02707023,-0.009941906,-0.005455586,-0.061922286,0.045666303,-0.008072606,0.012337379,0.023968577,0.018471451,-0.004846333,-0.04580477,0.014303605,0.0074425824,-0.02515939,-0.02254237,0.0116658155,-0.0031795406,0.041706156,0.034201264,-0.03325969,-0.048518714,-0.0121919885,-0.004365161,0.03384125,0.025685564,0.0046594026,-0.021600798,0.010246532,-0.00041302005,0.014116676,-0.0038562962,-0.021213092,0.017446797,-0.007878752,-0.0058052144,0.026336357,-0.0035135914,-0.032816596,-0.020008432,0.015757505,-0.018028358,-0.02545017,-0.004417086,0.036638275,0.029631864,0.0076225894,0.013154332,0.010904249,-0.019814579,-0.0386045,0.019620724,0.020063818,-0.022473138,-0.02952109,0.024674758,0.022930078,0.013223565,-0.027181003,-0.0029822255,-0.036416728,-0.005022878,-0.032650437,0.018014511,0.06657477,-0.006317541,0.022140818,0.0010791745,0.0052617327,-0.006300233,-0.026502518,-0.011797359,-0.015549805,-0.0026810605,-0.006082148,0.04076458,0.018125284,-0.011499655,0.023677798,0.0033907022,-0.018886851,-0.009941906,0.0016261177,0.010571929,0.031127304,0.01647753,-0.017169865,-0.05402969,-0.025616331,-0.0062240763,0.0024473981,-0.045860156,0.045943234,-0.0053828913,-0.0038528347,-0.025339397,-0.036776744,-0.009526506,-0.020368444,0.012295838,0.060482234,0.02673791,0.006487163,-0.021171551,-0.0028818373,0.023968577,-0.009263419,0.014732852,-0.006805636,0.017308332,0.023331631,0.028994918,0.010544236,-0.025187084,-0.027305624,-0.027596405,0.0060129142,-0.03467205,0.041872315,-0.0056286696,-0.036804438,0.0145805385,-0.009644202,-0.008626472,0.00024729277,-0.031044224,0.03043497,0.0009199378,-0.03533669,0.010980406,-0.0023798957,-0.011388882,0.028039496,-0.026765604,-0.012711239,0.024259357,0.014677465,-0.014732852,-0.05195269,-0.0021635415,0.047272515,-0.016892932,0.0053067342,0.007968755,0.017516032,0.00025551426,-0.024217818,-0.016726771,0.0011579273,0.061479192,0.01603444,0.035890557,-0.0010021525,-0.004098613,0.019482259,-0.0006373793,-0.009962676,0.041456915,-0.03741369,-0.013507422,0.02869029,-0.002478553,0.013860512,0.025934804,0.03483821,0.0029008763,0.010841939,-0.016311372,-0.009581893,-0.0033889713,-0.025256317,0.0063210027,0.010294995,0.0069164094,0.020977698,-0.016048284,0.0076225894,0.02299931,-0.018873004,-0.010274226,-0.014414378,0.0040674577,0.010835015,-0.005324043,-0.005573283,-0.016339066,-0.0039878394,-0.0013076444,-0.022694685,0.015785199,0.0069683343,0.032511972,0.015369798,0.025754798,-0.013521269,0.04364469,0.022722378,0.024300897,0.029991876,-0.006618706,-0.005978298,-0.019676112,0.0032833905,-0.019786885,-0.024633218,0.02025767,0.008079529,-0.024785532,0.004628248,0.0028904914,-0.010537312,0.03708137,-0.011603505,0.016297525,-0.03060113,0.0009060912,0.011596582,0.023400864,-0.008488006,0.02287469,0.019731497,0.012822012,-0.011201953,0.032484278,0.00018379284,-0.02918877,-0.05588514,0.021933118,0.027887184,0.008183379,-0.0048705647,0.008190302,-0.025020923,0.011465039,-0.0004175635,0.027499476,0.019980738,0.009754975,-0.017432952,0.034478195,0.013292799,0.011589658,-0.046912502,0.016906777,0.010696549,-0.000020486033,0.04630325,0.035862863,0.0011207145,-0.00034897923,0.006577166,-0.0016936202,0.018526837,-0.008515699,0.00020391378,-0.043423142,0.0016477532,0.008162609,0.006379851,0.019454565,0.0058017527,0.007871829,0.0005530012,0.046247862,0.016837545,0.000318906,0.03841065,-0.023636257,-0.049571063,0.021891577,0.003620903,0.011956596,0.010703472,-0.028551824,-0.043838542,-0.006483701,-0.022445444,-0.015923666,0.011264262,0.05247886,-0.002343548,-0.014386686,-0.017903738,-0.00032474758,-0.013687429,-0.0027208696,-0.0048774877,0.023553178,-0.028662598,0.02395473,-0.00060795515,0.028039496,-0.011624276,0.030185731,-0.009997292,0.032041185,0.024120891,-0.015051325,0.003319738,0.030241117,0.03317661,0.021614645,-0.023705492,-0.03206888,0.010883478,-0.0063971593,0.03757985,0.038936824,0.0067467876,-0.023137778,-0.012358149,-0.0067814044,-0.0034374346,-0.0014989015,-0.0005486741,0.03577978,0.03317661,-0.022196205,-0.008301076,-0.021573104,0.004223233,0.016726771,0.016976012,-0.027125617,0.013659735,0.035308998,-0.000928592,0.00054997223,0.023054698,-0.0030878063,-0.0035118605,0.016740618,0.017834505,-0.010530389,-0.07050722,-0.0096234325,-0.0074841226,-0.022030044,-0.009609586,-0.052921955,0.008294152,-0.0390199,-0.04622017,-0.005403661,0.010440386,-0.0036070563,0.0023972038,-0.023027005,-0.011908133,0.025325552,-0.0045590145,0.010204992,0.009069566,-0.018332984,-0.007304116,-0.010710396,-0.020354599,-0.015508265,-0.0029389546,0.007767979,-0.0048913346,-0.02623943,-0.0044690114,0.025920957,-0.018236058,-0.03176425,0.017460644,-0.03334277,-0.010488849,0.018388372,-0.019897658,-0.006847176,0.012891245,-0.0058536776,-0.0016875623,0.007546433,0.034782823,0.009699589,0.0043547763,0.010578852,-0.0034928212,0.025076311,-0.011215799,-0.043201596,0.0041539995,-0.009928059,-0.018928392,0.00392553,0.010710396,-0.033065837,0.015009785,0.002156618,-0.023677798,0.014178985,-0.04106921,0.042869277,0.02723639,0.0016936202,-0.030324196,-0.02885645,0.0033803172,0.030878063,-0.030794984,-0.040183023,-0.011811205,-0.03109961,-0.034948982,-0.038466036,-0.0040639965,-0.033952024,0.029493397,-0.034561276,0.110551775,0.01950995,-0.012946632,-0.026710218,0.018416066,-0.011928902,-0.00038900477,0.0037628312,-0.003217619,-0.030379584,0.020562299,-0.0022241205,-0.010440386,0.012309685,-0.023110084,-0.02869029,-0.047106355,0.0138743585,-0.017502185,-0.029244157,0.023248551,0.011921979,0.024010118,0.011409652,0.007719516,-0.030905757,0.015965205,0.009914212,0.012621235,0.027887184,0.04929413,-0.017834505,-0.0073595024,0.0084810825,-0.02038229,-0.010288073,0.003880528,-0.010585776,-0.018512992,-0.006369466,-0.0054209693,-0.0045243977,0.04555553,0.040626116,0.018942239,0.019897658,0.01570212,0.006352158,-0.009180339,0.005137113,0.008363386,-0.014068212,-0.014912859,-0.016546765,-0.0072487295,0.0015819815,-0.020313058,0.013403572,0.026751757,0.011984289,-0.014635925,-0.02869029,-0.010336536,0.023968577,-0.0013630311,0.021240784,-0.018651458,-0.025187084,0.043866236,0.0017420836,0.017945278,0.03757985,-0.03932453,-0.003568978,-0.009069566,0.022888537,-0.025588637,-0.0026949071,0.007615666,-0.029825717,0.0016918894,0.014746699,0.021268478,0.046524797,0.023096237,0.0023297013,-0.0032747362,-0.0064248526,0.0120258285,-0.022514679,0.020977698,-0.009034949,-0.009969599,-0.017626805,0.00009140962,-0.012891245,-0.021434639,0.004680173,0.014116676,-0.049571063,-0.017086785,-0.0014019748,0.0050782645,-0.0028506822,-0.005978298,0.03782909,0.035862863,-0.017059091,-0.0021877731,0.021642338,-0.0075187394,0.010274226,0.0047424827,-0.016823698,-0.0088410955,-0.049681835,0.00088878284,0.07288884,-0.038936824,0.0063417726,0.037136756,0.009741129,0.04131845,0.005943681,0.015245179,-0.020936158,-0.0120258285,0.011354266,0.039878394,-0.020839231,0.018457605,0.009900366,0.02993649,0.0076572057,0.012842782,0.000485066,-0.004451703,-0.009360346,0.0539743,-0.0066256295,-0.015646731,-0.022431597,0.010731165,0.015314411,0.004160923,0.039546076,-0.018831465,0.008744169,0.023636257,0.008107223,0.0076433592,-0.0051924996,0.03309353,-0.011430422,0.007920292,-0.010294995,-0.019440718,-0.018568378,-0.014123599,0.018069899,-0.032705825,0.0011951403,-0.010578852,-0.016699078,0.020617684,0.013500499,-0.015079019,-0.001587174,-0.005227116,-0.0031985797,-0.03010265,0.029548783,0.017640652,0.012219682,-0.014165139,0.010108066,-0.0043928544,0.001969688,0.025796337,0.016159058,0.0028074114,-0.0013396649,-0.035475157,-0.0028852988,0.021102319,0.036389038,-0.016186751,-0.016075978,0.0073387325,0.038466036,0.003506668,-0.013050482,-0.020977698,-0.018928392,-0.013265105,0.024937844,-0.012309685,0.009284189,-0.036776744,0.024923997,0.021753112,0.026059425,-0.00089657155,0.03168117,0.018900698,-0.032207344,-0.028801063,0.006622168,0.0010436923,-0.00015198879,-0.0015629423,-0.009007256,0.009464196,0.030822678,0.029964184,0.0014660157,-0.02599019,0.013590502,-0.034976676,0.001306779,0.0038320646,0.0027052923,0.0041055363,0.008716476,-0.024010118,-0.007553356,0.046192475,0.018014511,-0.008418772,0.0035516697,-0.00047597912,-0.013749738,-0.032982755,-0.027693331,0.02511785,0.018582225,-0.034395117,-0.013147409,-0.015452879,-0.038936824,0.0014365915,0.0016927548,-0.028745677,0.003394164,0.0005949739,0.004264773,0.013950516,0.0035135914,0.0048913346,-0.025062464,0.009145723,0.06873485,-0.0019973814,0.022694685,0.00030679017,-0.0049605677,0.010371152,-0.03201349,-0.015646731,-0.039379917,0.028261043,-0.013175102,0.030656517,0.010835015,-0.03608441,-0.006379851,0.005251348,0.007058338,0.02528401,0.019828424,-0.055165116,-0.014857472,-0.031570397,0.016712924,-0.052451167,0.013632042,0.009401886,0.03757985,0.003766293,0.024259357,0.013915898,-0.02416243,-0.035142835,-0.0010272495,0.03001957,-0.041623075,0.018332984,0.007137956,0.027887184,0.028039496,-0.009145723,-0.019676112,0.018125284,0.016255986,0.030628823,-0.0074010426,0.0072971927,-0.020562299,0.011271185,-0.0006209364,0.045721687,-0.052340396,-0.01809759,-0.03433973,-0.00828723,-0.031127304,-0.019828424,-0.018249905,0.0050609563,-0.017765272,0.03168117,-0.013479728,-0.0040397644,-0.0071725724,0.020908464,-0.0023712413,0.027000997,-0.013625119,-0.015134405,-0.016103672,-0.0031674246,0.027084077,-0.00013111062,0.004230156,0.022306977,0.0023193164,-0.0031120381,0.024923997,0.012316609,0.0032626204,0.0134381885,-0.0016624653,-0.002945878,-0.0013249528,0.009270342,-0.031791944,-0.028634904,-0.022251591,0.0012539886,-0.0074010426,0.03101653,0.029382624,-0.039933782,0.0032712747,0.001929879,0.035142835,0.041678462,0.012226606,-0.006878331,-0.018416066,0.02071461,-0.06136842,0.0038839895,-0.02461937,-0.04159538,0.026973303,0.006057916,0.021960812,0.0059090643,-0.03425665,0.018263752,0.019191477,-0.0069960277,-0.011977365,0.00022803727,-0.0024456673,0.024591677,0.025325552,0.021365404,0.0020475755,-0.049931075,-0.005372506,0.0076918225,-0.014303605,-0.011201953,0.008550316,0.0020112281,-0.031321157,-0.026267124,0.0053898143,-0.00070228556,-0.005590591,0.024467057,-0.02869029,0.033979718,-0.027499476,0.009616509,-0.016726771,0.012060446]',
  });
  return data;
}

export async function pgroonga_search() {
  const { data } = await supabase.rpc('pgroonga_search_processes', {
    filter_condition: {},
    query_text: '废钢',
    pageSize: 10,
    pageCurrent: 1,
  });
  return data;
}

export async function returnUserEdgeFunction() {
  const session = await supabase.auth.getSession();
  const { data } = await supabase.functions.invoke('return_user', {
    headers: {
      Authorization: `Bearer ${session.data.session?.access_token ?? ''}`,
    },
    body: {},
    region: FunctionRegion.UsEast1,
  });
  return data;
}

export async function flow_hybrid_search(query: string, filter: any) {
  const session = await supabase.auth.getSession();
  const { data, error } = await supabase.functions.invoke('flow_hybrid_search', {
    headers: {
      Authorization: `Bearer ${session.data.session?.access_token ?? ''}`,
    },
    body: { query: query, filter: filter },
    region: FunctionRegion.UsEast1,
  });
  console.log('data', data);
  console.log('error', error);
  return data;
}

export async function jsonSelectTest() {
  const { data, error } = await supabase
    .from('contacts')
    .select(
      `
        id,
        json->contactDataSet->contactInformation->dataSetInformation->"common:shortName",
        json->contactDataSet->contactInformation->dataSetInformation->"common:name",
        json->contactDataSet->contactInformation->dataSetInformation->classificationInformation->"common:classification"->"common:class",
        json->contactDataSet->contactInformation->dataSetInformation->email,
        created_at
        `,
    )
    .order('created_at', { ascending: true })
    // .limit(10)
    .range(10, 20);
  console.log('data', data);
  console.log('error', error);
  return data;
}

export async function storage() {
  const session = await supabase.auth.getSession();

  // const result = await supabase.storage
  //   .from('external_docs')
  //   .getPublicUrl('A1uGb6xfkotXG0xg0krcTTYInUh.png');

  const aa =
    'https://qgzvkongdjqiiamzbbts.supabase.co/storage/v1/object/authenticated/external_docs/b81d4445-3c9f-44cb-ab02-fa52478eeea2.png';

  const response = await fetch(aa, {
    headers: {
      Authorization: `Bearer ${session.data.session?.access_token ?? ''}`,
    },
  });

  console.log('response', response);

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  console.log('url', url);

  return url;
}

export async function getILCDLocation(id: string) {
  const result = await supabase.rpc('ilcd_location_get', { id });
  console.log(result);
}
