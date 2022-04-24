import React, { Component } from 'react';
import { Link } from "react-router-dom";

import 'style/detailpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";

class DetailContent extends Component {
    
    render() {
        return (
            <div id='detailpage-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'/></div>
                <div id='detailpage-info-box'>
                    <div id='detailpage-info-title'>제목</div>
                    <div id='detailpage-info-anchor'>
                        <Link to='#detailpage-info-majorinfo' className='detailpage-info-anchor-a'>주요 정보</Link>
                        <Link to='#detailpage-img-trailer' className='detailpage-info-anchor-a'>트레일러</Link>
                        <Link to='#detailpage-img-stillcut' className='detailpage-info-anchor-a'>스틸컷</Link>
                        <Link to='#detailpage-review-box' className='detailpage-info-anchor-a'>평점/리뷰</Link>
                    </div>
                    <div id='detailpage-info-majorinfo'>
                        <h4 className='detailpage-box-title'>주요 정보</h4>
                        <div id='detailpage-info-majorinfo-img'>
                            <img id='detailpage-info-poster-img' src={require('../images/test/test_detail.jpg')} />
                            <div>★ ★ ★ ★ ☆</div>
                        </div>
                        <div id='detailpage-info-majorinfo-basic'>
                            <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>개봉: <span>xxxx/xx/xx</span></div>
                            <div className='detailpage-info-majorinfo-basic-content' id='basic-genre'>기본정보: <span>15세 이상</span><span>70분</span> ,장르: <span>코미디/멜로</span></div>
                            <div className='detailpage-info-majorinfo-basic-content' id='basic-director'>감독/연출진: <span>김은진, 신명지, 이수경</span></div>
                            <div className='detailpage-info-majorinfo-basic-content' id='basic-actor'>배우: <span>김은진, 신명지, 이수경</span></div>
                            <div id='detailpage-info-majorinfo-basic-storyline'>
                                <p>《반지의 제왕: 왕의 귀환》(The Lord of the Rings: The Return of the King)은 J. R. R. 톨킨의 소설
                                왕의 귀환을 원작으로 하여 제작한 서사 판타지 모험 영화이다. 반지의 제왕 영화 삼부작 중
                                세 번째이자 마지막 작품이며, 피터 잭슨이 감독, 각본, 제작을 맡았다. 일라이저 우드, 비고 모텐슨
                                , 이언 매켈런, 숀 애스틴, 올랜도 블룸, 리브 타일러, 크리스토퍼 리와 휴고 위빙 등이 출연하였으며
                                , 제작 자금은 미국의 뉴 라인 시네마가 배급했으나, 촬영과 편집 모두 피터 잭슨의 고향 뉴질랜드에서
                                진행되었다. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='detailpage-img-box'>
                    <div id='detailpage-img-trailer'>
                        <h4 className='detailpage-box-title'>트레일러</h4>
                        <div className='detailpage-img-table-wrap'>
                            <table className='detailpage-img-table'>
                                <tr>
                                    <td className='detailpage-img-trailer-td'>img 1</td>
                                    <td className='detailpage-img-trailer-td'>img 2</td>
                                    <td className='detailpage-img-trailer-td'>img 3</td>
                                </tr>
                                <tr>
                                    <td className='detailpage-img-trailer-td'>img 1</td>
                                    <td className='detailpage-img-trailer-td'>img 2</td>
                                    <td className='detailpage-img-trailer-td'>img 3</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div id='detailpage-img-stillcut'>
                        <h4 className='detailpage-box-title'>스틸컷</h4>
                        <div className='detailpage-img-table-wrap'>
                        <table className='detailpage-img-table'>
                                <tr>
                                    <td className='detailpage-img-stillcut-td'>img 1</td>
                                    <td className='detailpage-img-stillcut-td'>img 2</td>
                                    <td className='detailpage-img-stillcut-td'>img 3</td>
                                    <td className='detailpage-img-stillcut-td'>img 4</td>
                                </tr>
                                <tr>
                                    <td className='detailpage-img-stillcut-td'>img 1</td>
                                    <td className='detailpage-img-stillcut-td'>img 2</td>
                                    <td className='detailpage-img-stillcut-td'>img 3</td>
                                    <td className='detailpage-img-stillcut-td'>img 4</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div id='detailpage-reviews-box'>
                    <h4 className='detailpage-box-title'>평점/리뷰</h4>
                    <div id='detailpage-reviews-review-table-wrap'>
                        <table id='detailpage-reviews-review-table'>
                            <tr>
                                <td className='detailpage-reviews-review'>
                                    <div className='detailpage-reviews-review-profile'>
                                        <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                        <div className='detailpage-reviews-review-profile-name'>이름</div>
                                    </div>
                                    <div className='detailpage-reviews-review-content'>
                                        <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                        <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                    </div>
                                </td>
                                <td className='detailpage-reviews-review'>
                                    <div className='detailpage-reviews-review-profile'>
                                        <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                        <div className='detailpage-reviews-review-profile-name'>이름</div>
                                    </div>
                                    <div className='detailpage-reviews-review-content'>
                                        <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                        <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='detailpage-reviews-review'>
                                    <div className='detailpage-reviews-review-profile'>
                                        <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                        <div className='detailpage-reviews-review-profile-name'>이름</div>
                                    </div>
                                    <div className='detailpage-reviews-review-content'>
                                        <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                        <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                    </div>
                                </td>
                                <td className='detailpage-reviews-review'>
                                    <div className='detailpage-reviews-review-profile'>
                                        <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                        <div className='detailpage-reviews-review-profile-name'>이름</div>
                                    </div>
                                    <div className='detailpage-reviews-review-content'>
                                        <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                        <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='detailpage-reviews-review'>
                                    <div className='detailpage-reviews-review-profile'>
                                        <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                        <div className='detailpage-reviews-review-profile-name'>이름</div>
                                    </div>
                                    <div className='detailpage-reviews-review-content'>
                                        <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                        <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                    </div>
                                </td>
                                <td className='detailpage-reviews-review'>
                                    <div className='detailpage-reviews-review-profile'>
                                        <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                        <div className='detailpage-reviews-review-profile-name'>이름</div>
                                    </div>
                                    <div className='detailpage-reviews-review-content'>
                                        <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                        <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br/>
                    <div id='detailpage-reviews-pagecontroller'>페이징? 페이지네이션?</div>
                </div>
            </div>
    );
    }
}

export default DetailContent;