<?php

namespace App\Http\Controllers\Admin;

use App\http\Model\Config;
use App\http\Model\Evaluates;
use App\http\Model\Notice;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class OtherController extends CommonController
{
    //
    public function configIndex()
    {
        $config = Config::first();
        return view('admin.other.config', compact('config'));
    }

    public function changeTitle()
    {
        $input = Input::all();
        if ($input){
            $config = Config::find($input['id']);
            $config->title = $input['title'];
            $re = $config->update();
            if($re){
                $data = [
                    'status' => 0,
                    'msg' => '软件名更新成功！',
                ];
            }else{
                $data = [
                    'status' => 1,
                    'msg' => '软件名更新失败，请稍后重试！',
                ];
            }
            return $data;
        }
    }

    public function noticeIndex()
    {
        $notice = Notice::first();
        return view('admin.other.notice', compact('notice'));
    }

    public function changeNotice()
    {
        $input = Input::all();
        if ($input){
            $notice = Notice::find($input['id']);
            $notice->notice = $input['notice'];
            $re = $notice->update();
            if($re){
                $data = [
                    'status' => 0,
                    'msg' => '公告更新成功！',
                ];
            }else{
                $data = [
                    'status' => 1,
                    'msg' => '公告更新失败，请稍后重试！',
                ];
            }
            return $data;
        }
    }

    public function evaluatesIndex()
    {
        $evaluates = Evaluates::orderBy('itemid')->paginate(10);
        return view('admin.other.evaluates', compact('evaluates'));
    }

    public function searchEvaluates($ev_id)
    {
        $evaluates = Evaluates::where('itemid', $ev_id)->orderBy('id','desc')->paginate(10);
        return view('admin.other.evaluates', compact('evaluates'));
    }

    public function delEvaluates()
    {
        $input = Input::except('_token');
        $re = Evaluates::where('id', $input['id'])->delete();
        if($re){
            $data = [
                'status' => 0,
                'msg' => '评论删除成功！',
            ];
        }else{
            $data = [
                'status' => 1,
                'msg' => '评论删除失败，请稍后重试！',
            ];
        }
        return $data;
    }
}